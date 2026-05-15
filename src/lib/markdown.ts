/**
 * Lightweight markdown-to-HTML converter.
 * Handles: headings, bold, italic, links, lists, blockquotes, code blocks,
 * inline code, horizontal rules, and paragraphs.
 * No external dependencies — keeps the bundle small.
 */
export function renderMarkdown(md: string): string {
  const lines = md.split("\n");
  const html: string[] = [];
  let inCodeBlock = false;
  let inList: "ul" | "ol" | null = null;

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];

    // Fenced code blocks
    if (line.startsWith("```")) {
      if (inCodeBlock) {
        html.push("</code></pre>");
        inCodeBlock = false;
      } else {
        if (inList) {
          html.push(inList === "ul" ? "</ul>" : "</ol>");
          inList = null;
        }
        inCodeBlock = true;
        html.push("<pre><code>");
      }
      continue;
    }
    if (inCodeBlock) {
      html.push(escapeHtml(line));
      continue;
    }

    // Close list if current line is not a list item
    const isUl = /^[-*]\s/.test(line.trimStart());
    const isOl = /^\d+\.\s/.test(line.trimStart());
    if (inList && !isUl && !isOl && line.trim() !== "") {
      html.push(inList === "ul" ? "</ul>" : "</ol>");
      inList = null;
    }

    // Horizontal rule
    if (/^---+$/.test(line.trim())) {
      html.push("<hr />");
      continue;
    }

    // Headings
    const headingMatch = line.match(/^(#{1,6})\s+(.+)/);
    if (headingMatch) {
      const level = headingMatch[1].length;
      html.push(`<h${level}>${inline(headingMatch[2])}</h${level}>`);
      continue;
    }

    // Blockquote
    if (line.startsWith("> ")) {
      html.push(`<blockquote><p>${inline(line.slice(2))}</p></blockquote>`);
      continue;
    }

    // Unordered list
    if (isUl) {
      if (inList !== "ul") {
        if (inList) html.push("</ol>");
        html.push("<ul>");
        inList = "ul";
      }
      html.push(`<li>${inline(line.trimStart().replace(/^[-*]\s/, ""))}</li>`);
      continue;
    }

    // Ordered list
    if (isOl) {
      if (inList !== "ol") {
        if (inList) html.push("</ul>");
        html.push("<ol>");
        inList = "ol";
      }
      html.push(
        `<li>${inline(line.trimStart().replace(/^\d+\.\s/, ""))}</li>`
      );
      continue;
    }

    // Empty line
    if (line.trim() === "") {
      continue;
    }

    // Paragraph
    html.push(`<p>${inline(line)}</p>`);
  }

  if (inList) html.push(inList === "ul" ? "</ul>" : "</ol>");
  if (inCodeBlock) html.push("</code></pre>");

  return html.join("\n");
}

function inline(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/`(.+?)`/g, "<code>$1</code>")
    .replace(
      /\[(.+?)\]\((.+?)\)/g,
      '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'
    );
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
