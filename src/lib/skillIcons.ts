/** Self-hosted brand icons (public/icons), vendored from Simple Icons.
 *  Hosted locally because the CDN periodically removes brand marks
 *  (csharp, oracle, microsoftsqlserver, openai are already gone upstream). */
export function skillIconUrl(slug: string): string {
  return `/icons/${slug}.svg`;
}
