// @ts-check

import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, basename } from 'node:path';
import svgo from 'svgo';
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

const outlines = filepaths.map((path) => {
	const fileContent = readFileSync(path, { encoding: 'utf8' });

	/**
	 * Optimised SVG, which should most notably:
	 * - get rid of translate attribute in favour of `Mx y`
	 * - reduce the precision of the path to a few decimals
	 */
	const svg = svgo.optimize(fileContent, { floatPrecision: 0 }).data;

	const { document } = parseHTML(svg);
	const lines = [...document.querySelectorAll('path')]
		.flatMap((path) => {
			const d = path.getAttribute('d');
			return d ? [d] : [];
		})
		.map((path) => {
			const length = Math.ceil(SVGPathCommander.getTotalLength(path));
			const start = SVGPathCommander.getPointAtLength(path, 0);
			const end = SVGPathCommander.getPointAtLength(path, length);

			return { path, length, start, end };
		});

	return {
		letterGroupings: [basename(path, '.svg')],
		specialOutlineMeanings: [],
		lines
	};
});

writeFileSync('outlines.json', JSON.stringify(outlines, null, 2), 'utf-8');
