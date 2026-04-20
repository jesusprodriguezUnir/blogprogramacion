# Astro Starter Kit: Basics

```sh
npm create astro@latest -- --template basics
```

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/withastro/astro/tree/latest/examples/basics)
[![Open with CodeSandbox](https://assets.codesandbox.io/github/button-edit-lime.svg)](https://codesandbox.io/p/sandbox/github/withastro/astro/tree/latest/examples/basics)
[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/withastro/astro?devcontainer_path=.devcontainer/basics/devcontainer.json)

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

![just-the-basics](https://github.com/withastro/astro/assets/2244813/a0a5533c-a856-4198-8470-2d67b1d7c554)


## �️ Estructura de la aplicación

```text
/ (raíz del proyecto)
├── public/                # Archivos públicos (imágenes, favicon, etc.)
├── src/
│   ├── assets/            # Recursos gráficos (SVG, imágenes)
│   ├── components/        # Componentes Astro reutilizables
│   │   └── __tests__/     # Tests de componentes
│   ├── data/              # Datos estáticos (posts.js)
│   ├── layouts/           # Plantillas de layout para páginas
│   ├── pages/             # Páginas del sitio (enlaces, index, prompts, sobre-mi, posts)
│   │   ├── posts/         # Páginas y posts individuales (MDX/MD)
│   │   └── __tests__/     # Tests de páginas
│   └── utils/             # Utilidades y helpers
│       └── __tests__/     # Tests de utilidades
├── tests/
│   └── e2e/               # Tests end-to-end con Playwright
├── playwright.config.ts   # Configuración de Playwright
├── vitest.config.ts       # Configuración de Vitest
├── tsconfig.json          # Configuración de TypeScript
├── package.json           # Dependencias y scripts
├── astro.config.mjs       # Configuración de Astro
└── README.md              # Documentación
```


### Diagrama visual (Mermaid)

> **Tip:** Puedes exportar el diagrama como imagen (PNG o SVG) desde la vista previa Mermaid en VS Code y guardarlo como `public/estructura-app-diagrama.png`.

#### Vista previa como imagen

![Estructura visual de la app](public/estructura-app-diagrama.png)

Puedes visualizar el diagrama con soporte Mermaid en VS Code o usando [Mermaid Live Editor](https://mermaid.live/):

```mermaid
graph TD
	A[public/] -->|Imágenes, favicon| B((App))
	C[src/assets/] -->|SVG, imágenes| B
	D[src/components/] -->|Componentes Astro| B
	E[src/layouts/] -->|Layouts| B
	F[src/pages/] -->|Páginas y posts| B
	G[src/data/] -->|Datos estáticos| B
	H[src/utils/] -->|Utilidades| B
	I[tests/e2e/] -->|Tests E2E| B
	J[src/**/__tests__/] -->|Tests unitarios| B
	B --> K[Usuario]
	style B fill:#f9f,stroke:#333,stroke-width:2px
	style K fill:#bbf,stroke:#333,stroke-width:2px
```

El archivo fuente del diagrama está en `estructura-app-diagrama.mmd`.

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
│   └── favicon.svg
├── src/
│   ├── layouts/
│   │   └── Layout.astro
│   └── pages/
│       └── index.astro
└── package.json
```

To learn more about the folder structure of an Astro project, refer to [our guide on project structure](https://docs.astro.build/en/basics/project-structure/).

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run test`            | Run unit tests with Vitest                       |
| `npm run test:watch`      | Run unit tests in watch mode                     |
| `npm run test:e2e`        | Run end-to-end tests with Playwright             |
| `npm run test:e2e:headed` | Run e2e tests with browser UI                    |
| `npm run test:e2e:debug`  | Run e2e tests in debug mode                      |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 🧪 Testing

This project includes comprehensive test coverage:
- **37 unit tests** covering utilities, data, components, and pages
- **~50 e2e tests** covering all pages, navigation, and accessibility

For detailed test coverage information, see [TEST-COVERAGE.md](TEST-COVERAGE.md).

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
