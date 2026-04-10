import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { getPostUrl, sortPostsByDate } from '../utils/posts';

export async function GET(context: { site: string }) {
	const posts = sortPostsByDate(await getCollection('blog'));
	return rss({
		title: 'Code Colossus',
		description: 'Ben Hughes on Software',
		site: context.site,
		items: posts.map((post) => ({
			title: post.data.title,
			pubDate: post.data.date,
			description: post.data.description,
			link: getPostUrl(post),
		})),
	});
}
