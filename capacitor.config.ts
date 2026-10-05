import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'dev.emilo.platedex',
  appName: 'PlateDex',
  webDir: 'dist',
  server: {
    url: 'https://platedex.emilo.workers.dev',
    cleartext: false
  }
};
export default config;
