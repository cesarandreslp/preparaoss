/**
 * Difunde un mensaje a todos los suscriptores activos del bot.
 * El texto se pasa por argumento (HTML permitido) o por el archivo que se indique.
 *
 *   npx ts-node --transpile-only --project tsconfig.scripts.json \
 *     scripts/telegram-broadcast.ts "🆕 <b>Nueva convocatoria DIAN</b> ..."
 *
 * Respeta el límite de ~30 msg/s de Telegram y desactiva al que bloqueó el bot.
 */
import { prisma } from "../src/lib/prisma"; // importar prisma carga .env
import { tgSend } from "../src/lib/telegram";

async function main() {
  const texto = process.argv[2]?.trim();
  if (!texto) throw new Error('Uso: telegram-broadcast.ts "<mensaje HTML>"');

  const subs = await prisma.telegramSub.findMany({ where: { activo: true }, select: { chatId: true } });
  console.log(`Enviando a ${subs.length} suscriptores...`);

  let ok = 0;
  let baja = 0;
  for (const { chatId } of subs) {
    const r = await tgSend(chatId, texto).catch(() => ({ ok: false, error_code: 0 }));
    if (r.ok) {
      ok++;
    } else if (r.error_code === 403) {
      // 403 = el usuario bloqueó el bot; lo marcamos inactivo para no reintentar.
      baja++;
      await prisma.telegramSub.update({ where: { chatId }, data: { activo: false } });
    }
    await new Promise((res) => setTimeout(res, 40)); // ~25 msg/s < límite de 30
  }

  console.log(`Listo. Enviados: ${ok} · Bajas (bloquearon): ${baja}`);
  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
