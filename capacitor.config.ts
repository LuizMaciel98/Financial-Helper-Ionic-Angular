import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.financasinteligentes',
  appName: 'Finanças Inteligentes',
  webDir: 'www',
  bundledWebRuntime: false,
  plugins: {
    SplashScreen: {
      backgroundColor: "#000000",
      launchShowDuration: 1000,
      launchAutoHide: true,
      androidSplashResourceName: "splash",
      androidScaleType: "CENTER_CROP",
      splashFullScreen: true,
      splashImmersive: true
    },
  },
};

export default config;
