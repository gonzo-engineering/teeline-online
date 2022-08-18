# teeline.online

[teeline.online](https://teeline.online) is a website for studying the [Teeline](https://en.wikipedia.org/wiki/Teeline_Shorthand) shorthand system. It is currently built with [Svelte](https://kit.svelte.dev/). To run locally download the repository then run `npm install npm` followed by `run dev -- --open`.

## Overview

Most of the site revolves around an array of outline objects, which contain all the information necessary to render 240+ unique outlines. Below is an example of what one looks like.

```ts
{
		name: ['ladies and gentlemen'],
		lines: [
			{
				path: 'M72.898 0C39.1048 11.2644 -6.8886 106.317 0.865583 139.66C5.84576 161.075 29.8074 167.407 45.3028 152.486C47.3425 150.522 57.6439 135.773 56.5741 135.773',
				translateValues: [330, 290]
			},
			{
				path: 'M6.22052 13.4261C6.28149 13.609 6.3323 14.1933 6.73874 13.6852C13.5625 5.15557 21.6861 -1.26291 33.2974 0.211551C51.8997 2.57374 68.9044 14.5389 66.8521 35.0618C64.0536 63.0467 49.1985 96.8419 29.7995 117.588C22.7525 125.124 15.8893 132.767 8.68206 140.131C6.95546 141.895 -0.133047 150.128 0.00190121 149.588',
				translateValues: [360, 380]
			}
		]
}
```

The `name` value is an array of strings rather than just a string because sometimes outlines can have multiple meanings. Each path corresponds to one line in that outline, and `translateValues` contains the x and y offset of the line from the top left hand corner of a 750 by 750 canvas. This allows words to be placed relative to a central line, which is essential for certain symbols.

These outline objects can be fed into `OutlineCard.svelte`, which contains an SVG with the given path (or paths) and a label. They look a little like this:

![Example of teeline.online outline cards](/docs/assets/cards-example.png)

If you hover over a card you can watch the outline being drawn as if by an invisible hand, which I'm super fucking happy about.

The outlines were 'hand drawn' on a tablet in [Krita](https://krita.org/en/) and saved as SVGs. These were then converted into the outline objects described above. To start with this was done manually then was eventually handled by the catchily named `turnSvgsIntoOutlineObjects.js`.

The font is a digitised version of my own non-cursive handwriting. This project was partly inspired by old revision cards from studying for my [NCTJ](https://www.nctj.com/) diploma and it felt like a nice nod to that.

## Resources and further reading

- [How to Get Handwriting Animation With Irregular SVG Strokes](https://css-tricks.com/how-to-get-handwriting-animation-with-irregular-svg-strokes/) by Trapti Rahangdale
- [SVG paths](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths) in MDN Web Docs
- [Teeline Mate](https://github.com/adxsoft/TeelineMate) by [@adxsoft](https://github.com/adxsoft)
