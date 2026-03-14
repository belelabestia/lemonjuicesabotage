import { marked } from 'marked';

/** renders a markdown text */
export const Render = (props: { content: string }) => (
  <article
    className="markdown"
    dangerouslySetInnerHTML={{ __html: marked.parse(props.content) }}
  />
);
