import type { LineDetails } from '#lib/data/interfaces/interfaces.ts';

const TOKEN = /[MmCc]|-?(?:\d+\.?\d*|\.\d+)(?:e[-+]?\d+)?/g;

// x(t) of a cubic Bézier between two endpoints/control points
const cubicX = (p0: number, p1: number, p2: number, p3: number, t: number) => {
	const mt = 1 - t;
	return mt ** 3 * p0 + 3 * mt ** 2 * t * p1 + 3 * mt * t ** 2 * p2 + t ** 3 * p3;
};

// Values of t in (0, 1) where the curve turns horizontally (dx/dt = 0)
const cubicXExtremaTs = (p0: number, p1: number, p2: number, p3: number) => {
	const a = 3 * (-p0 + 3 * p1 - 3 * p2 + p3);
	const b = 6 * (p0 - 2 * p1 + p2);
	const c = 3 * (p1 - p0);
	if (Math.abs(a) < 1e-9) return Math.abs(b) < 1e-9 ? [] : [-c / b];
	const discriminant = b * b - 4 * a * c;
	if (discriminant < 0) return [];
	const root = Math.sqrt(discriminant);
	return [(-b + root) / (2 * a), (-b - root) / (2 * a)];
};

// Exact horizontal extent of a path made of M and c/C commands, which is all
// the outline data uses
export const getPathXBounds = (path: string) => {
	const tokens = path.match(TOKEN) ?? [];
	let command = '';
	let x = 0;
	let y = 0;
	let min = Infinity;
	let max = -Infinity;
	const include = (value: number) => {
		min = Math.min(min, value);
		max = Math.max(max, value);
	};

	for (let i = 0; i < tokens.length;) {
		if (/[a-z]/i.test(tokens[i])) {
			command = tokens[i++];
			continue;
		}
		if (command === 'M' || command === 'm') {
			// A leading relative move is treated as absolute, per the SVG spec
			x = Number(tokens[i]) + (command === 'm' && i > 1 ? x : 0);
			y = Number(tokens[i + 1]) + (command === 'm' && i > 1 ? y : 0);
			include(x);
			i += 2;
		} else if (command === 'c' || command === 'C') {
			const [x1, , x2, , x3, y3] = tokens.slice(i, i + 6).map(Number);
			const offset = command === 'c' ? x : 0;
			const [p1, p2, p3] = [x1 + offset, x2 + offset, x3 + offset];
			for (const t of cubicXExtremaTs(x, p1, p2, p3)) {
				if (t > 0 && t < 1) include(cubicX(x, p1, p2, p3, t));
			}
			include(p3);
			y = y3 + (command === 'c' ? y : 0);
			x = p3;
			i += 6;
		} else {
			if (import.meta.env.DEV)
				console.warn(`Unsupported path command '${command}':`, path.slice(0, 40));
			break;
		}
	}
	return { min, max };
};

export const getLinesXBounds = (lines: LineDetails[]) =>
	lines.reduce(
		(bounds, line) => {
			const { min, max } = getPathXBounds(line.path);
			return { min: Math.min(bounds.min, min), max: Math.max(bounds.max, max) };
		},
		{ min: Infinity, max: -Infinity }
	);
