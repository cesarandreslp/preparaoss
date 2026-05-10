/**
 * Cliente Zhipu (BigModel/GLM) — OpenAI-compatible endpoint.
 * Se usa como fallback cuando Groq pega rate-limit.
 *
 * Docs: https://bigmodel.cn/dev/api
 * GLM-4-Flash es free, rápido, calidad cercana a GPT-3.5.
 */

import OpenAI from "openai";

export const zhipu = new OpenAI({
  apiKey: process.env.ZHIPU_API_KEY,
  baseURL: "https://open.bigmodel.cn/api/paas/v4",
});

export const ZHIPU_MODEL = process.env.ZHIPU_MODEL ?? "GLM-4.7-Flash";
