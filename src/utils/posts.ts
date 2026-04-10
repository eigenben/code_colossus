import type { CollectionEntry } from 'astro:content';

export function getPostUrl(post: CollectionEntry<'blog'>): string {
  const date = post.data.date;
  const year = String(date.getUTCFullYear());
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  const slug = post.id.replace(/^\d{4}-\d{2}-\d{2}-/, '');
  return `/blog/${year}/${month}/${day}/${slug}`;
}

export function getTagSlug(tag: string): string {
  return tag.toLowerCase().replace(/\s+/g, '-');
}

export function sortPostsByDate(posts: CollectionEntry<'blog'>[]): CollectionEntry<'blog'>[] {
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}
