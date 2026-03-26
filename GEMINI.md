# Project Documentation: ljs

This document outlines the structure, build process, and conventions of the `ljs` project.

## Project Overview

The `ljs` project is a Node.js web application built with TypeScript and React. It appears to function as a server-rendered application with an API backend. The project utilizes Express.js for handling API routes and Sass for styling. It also includes functionality for processing Markdown content, as indicated by the `marked` dependency and `src/lib/md.tsx` file.

## Technologies

*   **Language:** TypeScript
*   **Runtime:** Node.js
*   **Backend Framework:** Express.js
*   **Frontend/SSR:** React (with JSX support)
*   **Styling:** Sass
*   **Module System:** ES Modules (`"type": "module"`)
*   **Build/Execution:** `tsx` for direct TypeScript execution.
*   **Markdown Processing:** `marked` library.

## Building and Running

### Development

To start the development server, which includes hot-reloading:
```bash
npm run dev
```
This command uses `tsx --watch .` to execute the main entry point (`index.ts` or `index.tsx`).

### Production

To build and run the application in a production environment, typical commands might involve:
1.  **Build:** While no explicit build script is defined in `package.json` for production, it's common in such projects to have a `build` script that compiles TypeScript. If one is missing, it might imply that `tsx` is used directly for execution in production as well, or a build step is managed externally (e.g., within Docker).
    *   *Note:* A `build` script is missing in `package.json`. If a production build is required, consider adding one, e.g., `"build": "tsc"` or a more sophisticated build process.
2.  **Start:**
    ```bash
    npm start
    ```
    This command uses `tsx .` to execute the main entry point. For a production deployment, consider using a process manager like PM2.

### Testing

There is no explicit test script defined in `package.json`. To establish a testing practice, consider adding a script like `"test": "vitest"` or `"test": "jest"`.

## Development Conventions

*   **Type Safety:** The project enforces strict TypeScript settings, including `strict: true`, `noUncheckedIndexedAccess`, and `exactOptionalPropertyTypes`, as seen in `tsconfig.json`.
*   **Module Resolution:** Uses ES Modules (`"type": "module"`) and `bundler` module resolution strategy.
*   **Error Handling:** The global context mentions using a custom `Result` type for error handling, likely implemented in `src/tstd/result.ts`. Avoid re-throwing errors; return `Result` objects.
*   **File Structure:**
    *   `src/api/`: Contains API route handlers.
    *   `src/lib/`: Houses common utility functions and modules.
    *   `src/style/`: Holds Sass variables, mixins, and resets.
    *   `src/tstd/`: Likely contains custom TypeScript types or utility functions.
    *   `posts/`: Directory for content, possibly Markdown files to be processed.
*   **JSX/React:** Uses `react-jsx` with `react` as the import source, indicating modern React usage. `verbatimModuleSyntax` is enabled, and `isolatedModules` is true, promoting robust module practices.
*   **File Naming:** Consistent use of `.ts`, `.tsx`, and `.sass` extensions.
*   **Configuration:** `tsconfig.json` defines TypeScript compiler options. `Dockerfile` and `compose.yaml` suggest containerized deployment.
