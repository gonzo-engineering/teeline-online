import fs from 'fs';
import { parse } from 'svg-parser';

const svgFolderPath = '../static/outlines/shortcuts/';

let outlinesObjectArray = [];

function roundToNearest10(num) {
    return Math.round(num / 10) * 10;
}

fs.readdirSync(svgFolderPath).forEach(file => {


    const fileContent = fs.readFileSync(svgFolderPath + file, { encoding: "utf8" })
    const lineCount = (fileContent.match(/translate/g) || []).length

    console.log(`SVG being parsed: ${file}`);
    console.log(`Lines in file: ${lineCount}`)

    function inferLinePath(stringifiedSvg) {
        const linePath = stringifiedSvg.split(' d="')[1].split('"/>')[0];
        return linePath;
    }

    function inferTranslateValues(stringifiedSvg) {
        const translateValuesAsStrings = stringifiedSvg.split('translate(')[1].split(')"')[0];
        const [x, y] = translateValuesAsStrings.split(',');
        return [roundToNearest10(+x), roundToNearest10(+y)]
    }

    if (lineCount === 1) {
        outlinesObjectArray.push({
            name: file.replace('.svg', ''),
            lines: [
                {
                    path: inferLinePath(fileContent),
                    translateValues: inferTranslateValues(fileContent)
                }
            ]
        })
    }

})

// console.log(JSON.stringify(outlinesObjectArray))

// fs.writeFile('/test.json', JSON.stringify(outlinesObjectArray), err => {
//     if (err) {
//         console.error(err)
//         return
//     }
//     //file written successfully
// })