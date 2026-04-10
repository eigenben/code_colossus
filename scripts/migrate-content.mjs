import { readFileSync, writeFileSync, mkdirSync, readdirSync, copyFileSync, existsSync, statSync } from 'fs';
import { join, basename, extname } from 'path';

const LEGACY_BLOG_DIR = './legacy/source/blog';
const OUTPUT_DIR = './src/content/blog';
const PUBLIC_DIR = './public';

mkdirSync(OUTPUT_DIR, { recursive: true });

const files = readdirSync(LEGACY_BLOG_DIR);

// Process markdown files
const markdownFiles = files.filter(f => {
	const stat = statSync(join(LEGACY_BLOG_DIR, f));
	return stat.isFile() && (f.endsWith('.markdown') || f.endsWith('.html.markdown'));
});

for (const file of markdownFiles) {
	// Skip drafts
	if (file.startsWith('DRAFT')) {
		console.log(`Skipping draft: ${file}`);
		continue;
	}

	const content = readFileSync(join(LEGACY_BLOG_DIR, file), 'utf-8');

	// Parse filename: YYYY-MM-DD-slug.html.markdown or YYYY-MM-DD-slug.markdown
	const match = file.match(/^(\d{4})-(\d{2})-(\d{2})-(.+?)(?:\.html)?\.markdown$/);
	if (!match) {
		console.log(`Skipping unrecognized filename: ${file}`);
		continue;
	}

	const [, year, month, day, slug] = match;
	const dateStr = `${year}-${month}-${day}`;
	const outFilename = `${dateStr}-${slug}.md`;

	// Parse frontmatter
	const fmMatch = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
	if (!fmMatch) {
		console.log(`No frontmatter found in: ${file}`);
		continue;
	}

	let [, frontmatter, body] = fmMatch;

	// Extract title
	const titleMatch = frontmatter.match(/^title:\s*"?(.*?)"?\s*$/m);
	const title = titleMatch ? titleMatch[1] : slug;

	// Extract and convert tags
	const tagsMatch = frontmatter.match(/^tags:\s*(.+)$/m);
	let tags = [];
	if (tagsMatch) {
		tags = tagsMatch[1].split(',').map(t => t.trim()).filter(t => t.length > 0);
	}

	// Fix the relative image path in the message-block post
	if (slug === 'message-block-error-messages-for-replacement') {
		body = body.replace(
			'![Message Block Example](message-block-error-messages-for-replacement/message_block_example.png)',
			'![Message Block Example](/blog/2008/11/26/message-block-error-messages-for-replacement/message_block_example.png)'
		);
	}

	// Build new frontmatter
	const tagsYaml = tags.length > 0 ? `\ntags: [${tags.map(t => `"${t}"`).join(', ')}]` : '';
	const newContent = `---
title: "${title.replace(/"/g, '\\"')}"
date: ${dateStr}${tagsYaml}
description: ""
---
${body}`;

	writeFileSync(join(OUTPUT_DIR, outFilename), newContent);
	console.log(`Migrated: ${file} -> ${outFilename}`);
}

// Copy blog-specific images to public/ preserving URL paths
const imageDirs = [
	{
		src: join(LEGACY_BLOG_DIR, '2008-11-26-message-block-error-messages-for-replacement'),
		dest: join(PUBLIC_DIR, 'blog/2008/11/26/message-block-error-messages-for-replacement'),
	},
	{
		src: join(LEGACY_BLOG_DIR, '2013-09-18-coding-on-the-road'),
		dest: join(PUBLIC_DIR, 'blog/2013/09/18/coding-on-the-road'),
	},
];

for (const { src, dest } of imageDirs) {
	if (!existsSync(src)) {
		console.log(`Image dir not found: ${src}`);
		continue;
	}
	mkdirSync(dest, { recursive: true });
	const imageFiles = readdirSync(src).filter(f => /\.(jpg|jpeg|png|gif|svg)$/i.test(f));
	for (const img of imageFiles) {
		copyFileSync(join(src, img), join(dest, img));
		console.log(`Copied image: ${img} -> ${dest}/`);
	}
}

// Copy mug.jpg to src/assets/
const mugSrc = './legacy/source/images/mug.jpg';
if (existsSync(mugSrc)) {
	copyFileSync(mugSrc, './src/assets/mug.jpg');
	console.log('Copied mug.jpg to src/assets/');
}

console.log('\nMigration complete!');
