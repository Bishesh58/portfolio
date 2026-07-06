/** Simple Icons CDN — brand-coloured marks when no color override is given. */
export function skillIconUrl(slug: string, color?: string): string {
  return color ? `https://cdn.simpleicons.org/${slug}/${color}` : `https://cdn.simpleicons.org/${slug}`;
}
