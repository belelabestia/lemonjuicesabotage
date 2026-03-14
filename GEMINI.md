# Project Context: lemonjuicesabotage

## Project Overview

This project is a Node.js web application built with TypeScript, React, and Express.js. It is configured for strict type safety and appears to utilize a server-side rendering (SSR) or static site generation (SSG) approach, indicated by the use of Express.js for serving content and a custom `html.send` utility for rendering React components into HTML responses. The inclusion of the `marked` library suggests potential for processing Markdown content.

## Building and Running

*   **Run:** To start the development server, use:
    ```bash
    npm start
    ```
    This command executes `tsx .`, which directly runs the TypeScript entry point (`index.tsx`).

*   **Build:** No explicit build scripts are defined in `package.json`. The `tsconfig.json` has `noEmit: true`, implying that the TypeScript compilation and output are handled by `tsx`.

*   **Testing:** No test scripts or configurations were found in the `package.json` or the explored files.

## Development Conventions

*   **Language:** TypeScript
*   **Frontend Framework:** React
*   **Backend Framework:** Express.js
*   **Module System:** Uses modern ES modules (`module: "esnext"`, `verbatimModuleSyntax: true`).
*   **JSX:** Configured for React 19+ with `react-jsx` and `react` as the import source.
*   **Type Safety:** The project enforces strict TypeScript practices, as evidenced by compiler options like `strict`, `noUncheckedIndexedAccess`, and `exactOptionalPropertyTypes`.
*   **Project Structure:**
    *   `index.tsx`: The main server entry point.
    *   `src/pages/`: Contains page-level React components (e.g., `article.tsx`).
    *   `src/lib/`: Contains utility modules (e.g., `html.tsx` for rendering helpers, `md.tsx` potentially for Markdown processing).
*   **Styling:** Component styling appears to be handled via CSS classes (e.g., `className="article"`), possibly using CSS modules or a similar approach. Always use SASS (indented) syntax for styling, never SCSS.

## Coding Preferences

*   **Strict TypeScript:** High emphasis on type safety, generics, branded types, and utility types (e.g., custom `tstd` library for `Branch`, `Union`, `Result`, `Flat`). Use of modern TypeScript features like `type * from`.
*   **Functional Programming Patterns:** Consistent use of utility functions and immutable data structures, particularly within the `tstd` library.
*   **Robust Error Handling:** Adherence to a custom `Result` type (`success`/`error` union) for handling potential errors gracefully, avoiding direct error throwing or null/undefined returns.
*   **Asynchronous Operations:** Proficient use of `async/await` with `fs/promises` for non-blocking I/O.
*   **Server-Side Rendering (SSR):** Integration of React with Express.js using `react-dom/server` for rendering components into full HTML documents.
*   **Markdown Support:** Utilization of the `marked` library for parsing and rendering Markdown content.
*   **Modular Design:** Adoption of a module organization strategy using `export * as` to create unified namespaces for related utilities (e.g., `lib.Db`, `tstd.Result`).
*   **Secure File Handling:** Implementation of security measures like path traversal prevention when accessing files.
*   **Modern JavaScript/TypeScript Features:** Leveraging modern language features and build tools like `tsx`.

## Key Files

*   `package.json`: Defines project dependencies, development dependencies, and scripts.
*   `tsconfig.json`: Configures the TypeScript compiler settings.
*   `index.tsx`: The main server entry point, setting up the Express server and running the application.
*   `index.sass`: The main SASS stylesheet for global styles.
*   `readme.md`: General project information and setup instructions.
*   `src/api/`: Contains API route handlers and related logic.
*   `src/lib/`: Houses utility functions and modules (e.g., `html.tsx` for rendering, `md.tsx` for Markdown processing, `db.ts` for database interactions).
*   `src/style/`: Contains global styling reset and base styles.
*   `src/tstd/`: Implements custom TypeScript utility types and functional programming helpers (e.g., `Result`, `Branch`).
