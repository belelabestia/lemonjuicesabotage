import type { ReactElement } from 'react';
import { renderToString } from 'react-dom/server';
import type { Response } from 'express';

/**
 * wraps a React component in a standard HTML document shell;
 * useful for simple SSR without a full templating engine
 */
const document = (component: ReactElement, title: string = 'App') =>
  `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
 * encapsulates the boilerplate of setting the body and sending the response.
        <link rel="stylesheet" href="style.css">
        <title>${title}</title>
      </head>
      <body>${renderToString(component)}</body>
    </html>
  `.trim();

/** sends a rendered React component as a complete HTML document */
export const send = (res: Response, component: ReactElement, title: string = 'App') => {
  const html = document(component, title);
  res.send(html);
};
