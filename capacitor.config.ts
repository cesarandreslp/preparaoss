import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.preparaoss.app",
  appName: "PreparaOss",
  webDir: "out",
  server: {
    // En desarrollo: apuntar al servidor local de Next.js
    url: process.env.NODE_ENV === "development" ? "http://localhost:3000" : undefined,
    cleartext: process.env.NODE_ENV === "development",
  },
  ios: {
    contentInset: "automatic",
  },
  android: {
    allowMixedContent: false,
    backgroundColor: "#0f1623",
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#0f1623",
      showSpinner: false,
    },
    PushNotifications: {
      presentationOptions: ["badge", "sound", "alert"],
    },
  },
};

export default config;
