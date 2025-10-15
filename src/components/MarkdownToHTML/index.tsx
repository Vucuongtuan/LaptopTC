import { Remarkable } from "remarkable";

const md = new Remarkable();

function renderMarkdownToHTML(markdown: string) {
  const renderedHTML = md.render(markdown);
  return { __html: renderedHTML };
}

export default function MarkdownPreview({ markdown }: { markdown: string }) {
  const markup = renderMarkdownToHTML(markdown);
  return <div dangerouslySetInnerHTML={markup} />;
}
