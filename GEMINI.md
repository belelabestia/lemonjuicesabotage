# Project Configuration: lemonjuicesabotage

This file documents the coding standards, conventions, and specific configurations observed within the lemonjuicesabotage project.

## Project Overview

This project is a Node.js web application built with TypeScript, React, and Express.js. It emphasizes strict type safety, server-side rendering (SSR), and a functional programming style, leveraging custom utility types.

## Development Environment & Execution

*   **Language:** TypeScript
*   **Module System:** ES Modules (`"type": "module"`, `verbatimModuleSyntax: true`)
*   **Execution:** Uses `tsx` for direct execution of TypeScript files during development and potentially runtime.
    *   *Note:* `tsconfig.json` has `noEmit: true`, indicating no traditional compilation output is generated. A dedicated build script is absent in `package.json`, suggesting `tsx` is the primary tool for running the application. This differs from projects that typically include a `tsc` build step for production.
*   **JSX:** Configured for React 19+ (`react-jsx`, `react` as import source).

## Core Technologies

*   **Backend Framework:** Express.js
*   **Frontend Framework:** React
*   **SSR/Rendering:** `react-dom/server` for SSR, integrated with Express via `lib.Html.send`.
*   **Styling:** SASS (indented syntax `.sass`) is used. Recent updates reflect a move towards component-level class names and external SASS files (`src/api/home.sass`) for improved organization, away from inline styles.
*   **Markdown Processing:** `marked` library is used.

## Coding Preferences & Conventions

*   **Strict TypeScript:** High emphasis on type safety, generics, branded types, and utility types. Leverages modern TypeScript features like `type * from`.
*   **Custom Utility Types (`tstd` library):** Extensive use of custom types for functional programming patterns and robust error handling:
    *   `Result<Value, Error>`: For graceful error management, avoiding direct exceptions.
    *   `Branch`, `Union`, `Flat`, `Brand`: For advanced type system manipulation and code clarity.
*   **Functional Programming Patterns:** Consistent use of utility functions, immutable data structures, and declarative approaches, particularly within the `tstd` library and helper modules.
*   **Robust Error Handling:** Adherence to the custom `Result` type for handling potential operation failures. `try-catch` blocks are primarily used for I/O operations or external library calls where error propagation is managed via the `Result` type.
*   **Asynchronous Operations:** Proficient use of `async/await` with `fs/promises` for non-blocking I/O.
*   **Modular Design:** Adoption of a modular structure with utilities in `src/lib/` and types in `src/tstd/`. Use of `export * as` for namespace creation (e.g., `lib.Db`, `tstd.Result`).
*   **Secure File Handling:** Implementation of security measures such as path traversal prevention when accessing files (e.g., in `src/lib/db.ts`).
*   **Development Server:** `npm start` executes `tsx .`, indicating a focus on direct TypeScript execution rather than a compiled JavaScript build for development.
*   **Commenting Guidelines:** Adhere to the following principles for adding comments:
    *   Use lowercase and avoid complex punctuation (e.g., excessive exclamation points, question marks within comments) in general comments.
    *   Add comments only for complex or non-obvious logic that requires explanation beyond the code itself. Avoid commenting single lines that describe simple actions.
    *   Refrain from trivial comments that state the obvious (e.g., `// increment count`).
    *   Prefer one-line JSDoc comments for functions and exported members to describe their purpose, parameters, and return values, rather than using simple block comments for the same information.

## Project Structure

*   **Entry Point:** `index.tsx`
*   **API Routes:** `src/api/`
*   **Library Utilities:** `src/lib/`
*   **Custom Types:** `src/tstd/`
*   **Global Styles:** `src/style/`

## Observations and Differences from Expectation

*   **Execution Model:** The project's reliance on `tsx` for direct TypeScript execution, coupled with `tsconfig.json`'s `noEmit: true`, is a specific choice. Many projects would typically employ a build step (`tsc`) and run compiled JavaScript for production, which is absent here.
*   **Custom Type System:** The extensive custom `tstd` library, while effective for functional programming and type safety, represents a more opinionated approach than relying solely on built-in TypeScript features or common third-party utility libraries (like `lodash` or `fp-ts` for FP patterns).
*   **Testing:** The absence of explicit test scripts or configurations in `package.json` is a notable point. Most professional projects include unit and integration tests.
*   **SASS Compilation:** The custom caching logic for SASS compilation in `src/lib/sass.ts` is functional for development. More complex projects might integrate with build tools like Webpack, Rollup, or Vite, or use dedicated SASS watch configurations.
*   **No Explicit Build Script:** The lack of a `build` script in `package.json` indicates the project might not have a formal build process for deployment, relying on `tsx` for runtime execution.

This `GEMINI.md` file aims to capture the unique aspects and conventions of this project's development environment.
