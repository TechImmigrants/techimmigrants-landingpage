/**
 * Smoothly scroll to an in-page anchor (e.g. "#programs"), accounting for the
 * sticky header height. Falls back gracefully if the target is missing.
 */
export function scrollToAnchor(href: string) {
  const id = href.startsWith("#") ? href.slice(1) : href;
  const el = document.getElementById(id);
  if (!el) return;
  const headerOffset = 72;
  const top = el.getBoundingClientRect().top + window.scrollY - headerOffset;
  window.scrollTo({ top, behavior: "smooth" });
}

export function isAnchor(href: string) {
  return href.startsWith("#");
}

export function isExternal(href: string) {
  return href.startsWith("http://") || href.startsWith("https://");
}

/**
 * Click handler for CTAs/links that may be in-page anchors, external URLs, or
 * internal routes. Returns true if it handled the event (anchor scroll).
 */
export function handleCtaClick(href: string, e: React.MouseEvent, onDone?: () => void) {
  if (isAnchor(href)) {
    e.preventDefault();
    scrollToAnchor(href);
    onDone?.();
    return true;
  }
  return false;
}
