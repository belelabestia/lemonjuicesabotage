import type { ReactElement } from 'react';
import { renderToString } from 'react-dom/server';
import type { Response } from 'express';

/**
 * wraps a React component in a standard HTML document shell;
 * useful for simple SSR without a full templating engine
 */
const document = (component: ReactElement, title: string = 'App', scriptSrc?: string) =>
  `<!DOCTYPE html>
    <html lang="en">
      <head>
        <title>${title}</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="/style.css">
        ${scriptSrc !== undefined ? `<script type="module" src="/script/${scriptSrc}" defer></script>` : ''}
      </head>
      <body>${renderToString(component)}</body>
    </html>
  `.trim();

/** 
 * sends a rendered React component as a complete HTML document;
 * optionally injects a script on the frontend
 */
export const send = (res: Response, component: ReactElement, title: string = 'App', scriptSrc?: string) => {
  const html = document(component, title, scriptSrc);
  res.send(html);
};
