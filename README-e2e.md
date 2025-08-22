# Pruebas E2E con Playwright

Resumen

Este repositorio incluye una configuración básica de Playwright y un test de ejemplo en `tests/e2e/home.spec.ts`.

Requisitos

- Node 18+ recomendado
- Instalar dependencias: `npm install`

Cómo ejecutar

Playwright está configurado para arrancar el servidor de desarrollo automáticamente antes de ejecutar las pruebas (usa `npm run dev`). Por defecto espera que la app esté en `http://localhost:4321`.

Ejecutar pruebas (Playwright arrancará el servidor si es necesario):

```powershell
npm run test:e2e
```

Ver tests en modo interactivo:

```powershell
npm run test:e2e:headed
```

Abrir inspector de Playwright:

```powershell
npm run test:e2e:debug
```

Personalizar URL

Si tu servidor corre en otro host/puerto, exporta `PLAYWRIGHT_BASE_URL` antes de ejecutar las pruebas. Ejemplo (PowerShell):

```powershell
$env:PLAYWRIGHT_BASE_URL = 'http://localhost:5173'; npm run test:e2e
```

Notas

- Playwright instala navegadores locales (`npx playwright install`).
- Opcional: puedo añadir una tarea que haga `build` y `preview` para ejecutar las pruebas contra la versión de producción si lo prefieres.
