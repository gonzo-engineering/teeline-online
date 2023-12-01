// @ts-check

import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, basename } from 'node:path';
import { parseHTML } from 'linkedom';
import SVGPathCommander from 'svg-path-commander';

const dir = dirname(fileURLToPath(import.meta.url));

/** get the grouping folders that are siblings to this file */
const groupings = readdirSync(dir, { withFileTypes: true })
	.filter((entry) => entry.isDirectory())
	.filter(({ name }) => name !== 'node_modules')
	.map(({ path, name }) => join(path, name));

const filepaths = groupings.flatMap((grouping) =>
	readdirSync(grouping, { withFileTypes: true })
		.filter(({ name }) => name.endsWith('.svg'))
		.map(({ path, name }) => join(path, name))
);

console.log({ filepaths });

const outlines = filepaths.map((path) => {
	const fileContent = readFileSync(path, { encoding: 'utf8' });

	const { document } = parseHTML(fileContent);
	const lines = [...document.querySelectorAll('path')]
		.flatMap((path) => {
			const d = path.getAttribute('d');
			const translate = path.getAttribute('transform');
			if (!d) return [];
			if (!translate) return d;

			const [, x, y] =
				translate
					.match(/([\d\.]+), ?([\d\.]+)/)
					?.map(Number)
					.map(Math.round) ?? [];

			return SVGPathCommander.pathToString(
				SVGPathCommander.pathToRelative(SVGPathCommander.transformPath(d, { translate: [x, y] }))
			);
		})
		.map((path) => {
			const length = Math.ceil(SVGPathCommander.getTotalLength(path));
			const start = SVGPathCommander.getPointAtLength(path, 0);
			const end = SVGPathCommander.getPointAtLength(path, length);

			return { path, length, start, end };
		});

	return path.split('/').at(-2) === 'specials'
		? {
				letterGroupings: [],
				specialOutlineMeanings: [basename(path, '.svg').split(',')],
				lines
		  }
		: {
				letterGroupings: [basename(path, '.svg').split(',')],
				specialOutlineMeanings: [],
				lines
		  };
});

// writeFileSync('../website/src/data/outlines.json', JSON.stringify(outlines, null, 2), 'utf-8');
writeFileSync('./outlines.json', JSON.stringify(outlines, null, 2), 'utf-8');
