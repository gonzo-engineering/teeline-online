import type { LineDetails, OutlineObject } from '$lib/data/interfaces/interfaces';

export const buildMultiDigitNumberObject = (
	numberAsString: string,
	outlineObjects: OutlineObject[]
): OutlineObject => {
	const digitOutlines = numberAsString.split('').map((digit) => {
		if (['1', '6', '7'].includes(digit)) {
			return conciseNumbers.find((outline) => outline.letterGroupings.includes(digit));
		}
		const digitOutline = outlineObjects.find((outline) => outline.letterGroupings.includes(digit));
		return (
			digitOutline ?? {
				letterGroupings: [digit],
				specialOutlineMeanings: [],
				lines: []
			}
		);
	});
	// Combine digits by moving each digit to the right of the previous digit
	const combinedLines = digitOutlines.reduce<LineDetails[]>((combinedLines, digitOutline, i) => {
		const overallOffset = (digitOutlines.length - 1) * 60;
		const offsetLines = digitOutline.lines.map((line) => {
			const path = line.path.replace(
				/M[\d\.]+( |,)[\d\.]+/,
				`M${line.start.x + i * 120 - overallOffset} ${line.start.y}`
			);
			return { ...line, path };
		});
		return [...combinedLines, ...offsetLines];
	}, []);
	return {
		letterGroupings: [numberAsString],
		specialOutlineMeanings: [],
		lines: combinedLines
	};
};

export const conciseNumbers: OutlineObject[] = [
	{
		letterGroupings: ['1'],
		specialOutlineMeanings: [],
		lines: [
			{
				path: 'M355.5251 373c0 28.5461 -5.5251 56.3856 -5.5251 84.7438',
				length: 85,
				start: {
					x: 355.5251,
					y: 373
				},
				end: {
					x: 350,
					y: 457.74379999999996
				}
			}
		]
	},
	{
		letterGroupings: ['6'],
		specialOutlineMeanings: [],
		lines: [
			{
				path: 'M382.4645 323.201c-3.3752 -1.2964 -7.3451 4.0293 -9.3788 5.9158c-21.7682 20.1936 -82.5676 117.2641 -30.649 133.2251c43.4607 13.36 91.0353 -56.0673 31.1529 -69.1856c-12.9133 -2.8289 -30.332 -3.3569 -42.5406 2.5728c-1.0632 0.5164 -8.7084 3.5198 -8.7084 4.6283',
				length: 347,
				start: {
					x: 382.4645,
					y: 323.201
				},
				end: {
					x: 322.3406,
					y: 400.3574
				}
			}
		]
	},
	{
		letterGroupings: ['7'],
		specialOutlineMeanings: [],
		lines: [
			{
				path: 'M336.0679 382c-2.4424 0 -0.1314 0.5128 1.3408 0.5128c1.7307 0 3.4614 0 5.1922 0c1.2838 0 2.5676 0 3.8514 0c1.5635 0 3.127 0 4.6905 0c2.7765 0 51.1377 1.6481 51.7506 3.9868c2.0428 7.7948 -38.29 43.9051 -47.0624 62.6255c-0.6728 1.4358 -2.9586 4.6779 -0.3351 3.474',
				length: 154,
				start: {
					x: 336.0679,
					y: 382
				},
				end: {
					x: 355.4959,
					y: 452.5991
				}
			}
		]
	}
];
