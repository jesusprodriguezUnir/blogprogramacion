import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  timeout: 60_000,
  expect: { timeout: 15_000 },
  fullyParallel: true,
  retries: 1,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    actionTimeout: 15_000,
    trace: 'on-first-retry',
    // Ajustado para el puerto en el que suele arrancar el dev server en este entorno
    baseURL: process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:4322'
  },
  webServer: {
    // Forzar puerto 4322 al iniciar el servidor para evitar colisiones de puerto
    command: 'npm run dev -- --port 4322',
    url: process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:4322',
    reuseExistingServer: true,
    timeout: 180_000
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } }
  ]
});
