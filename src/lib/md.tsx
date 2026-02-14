import { marked } from 'marked';
import type { FC } from 'react';
import { renderToString } from 'react-dom/server';

/**
 * Converts a markdown string into an HTML string.
 */
export const html = (markdown: string) => {
  return marked.parse(markdown);
};

/**
 * Renders a markdown text.
 */
export const Render: FC<{ content: string }> = props => {
  const content = html(props.content);

  return (
    <article
      className="markdown"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};
