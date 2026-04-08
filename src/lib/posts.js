const postModules = import.meta.glob('../content/posts/*.mdx', { eager: true });

/**
 * Normalize date values.
 * Supports:
 * - 'YYYY-MM-DD'
 * - 'current' → today
 */
function resolveDate(date) {
  if (date === 'current') {
    const now = new Date();
    // normalize to date-only (prevents time weirdness)
    return new Date(now.getFullYear(), now.getMonth(), now.getDate());
  }

  return new Date(date);
}

/**
 * Optional helper for UI usage
 */
export function getPostYear(post) {
  return resolveDate(post.date).getFullYear();
}

const posts = Object.entries(postModules)
  .map(([path, module]) => {
    const slug = path.split('/').pop().replace(/\.mdx$/, '');

    return {
      slug,
      Component: module.default,
      ...module.metadata
    };
  })
  .sort((a, b) => resolveDate(b.date) - resolveDate(a.date));

export function getAllPosts() {
  return posts;
}

export function getPostBySlug(slug) {
  return posts.find((post) => post.slug === slug);
}
