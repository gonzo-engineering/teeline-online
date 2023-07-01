import { readdirSync, readFileSync, writeFile } from 'fs';

const svgFolderPath = '../../static/outlines/groupings/';

let outlinesObjectArray = [];

function roundToNearest10(num) {
	return Math.round(num / 10) * 10;
}

readdirSync(svgFolderPath).forEach((file) => {
	const fileContent = readFileSync(svgFolderPath + file, { encoding: 'utf8' });
	const lineCount = (fileContent.match(/translate/g) || []).length;

	function inferLinePath(stringifiedSvg, lineNumber) {
		const linePath = stringifiedSvg.split(' d="')[lineNumber].split('"/>')[0];
		return linePath;
	}

	function inferTranslateValues(stringifiedSvg, lineNumber) {
		const translateValuesAsStrings = stringifiedSvg.split('translate(')[lineNumber].split(')"')[0];
		const [x, y] = translateValuesAsStrings.split(',');
		return [roundToNearest10(+x), roundToNearest10(+y)];
	}

	let outlineObject = {
		letterGroupings: [file.replace('.svg', '')],
		specialOutlineMeanings: [],
		lines: []
	};

	for (let i = 0; i < lineCount; i++) {
		outlineObject.lines.push({
			path: inferLinePath(fileContent, i + 1),
			translateValues: inferTranslateValues(fileContent, i + 1)
		});
	}

	outlinesObjectArray.push(outlineObject);
});

console.log(JSON.stringify(outlinesObjectArray));

// fs.writeFile('/test.json', JSON.stringify(outlinesObjectArray), err => {
//     if (err) {
//         console.error(err)
//         return
//     }
//     //file written successfully
// })
