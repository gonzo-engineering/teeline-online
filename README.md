# teeline.online

[teeline.online](https://teeline.online) is a website for studying the [Teeline](https://en.wikipedia.org/wiki/Teeline_Shorthand) shorthand system. It is currently built with [Svelte](https://kit.svelte.dev/). To run locally download the repository then run `npm install npm` followed by `run dev -- --open`.

## Overview

Most of the site revolves around an array of outline objects, which contain all the information necessary to render 240+ unique outlines. Below is an example of what one looks like.

```ts
{
		"letterGroupings": [
			"imp"
		],
		"specialOutlineMeanings": [
			"important"
		],
		"lines": [
			{
				"path": "M31.6328 0C32.12 1.02423 31.8825 0.163041 31.6328 1.38786C27.9727 19.3407 11.5986 39.3923 4.18692 56.7039C4.06859 56.9803 1.81512 63.4449 1.0745 63.4449C-3.05311 63.4449 5.82 56.5632 8.99703 53.9281C21.4059 43.636 36.6253 34.5244 50.5903 26.171C88.6116 3.42776 149.34 -14.4002 188.386 20.4213C228.762 56.4296 191.779 205.786 201.401 259.727",
				"translateValues": [
					240,
					400
				]
			}
		]
	}
```

The `letterGroupings` and `specialOutlineMeanings` values are arrays of strings rather than just strings because sometimes outlines can have multiple meanings. Each path corresponds to one line in that outline, and `translateValues` contains the x and y offset of the line from the top left hand corner of a 750 by 750 canvas. This allows words to be placed relative to a central line, which is essential for certain symbols.

These outline objects can be fed into `OutlineCard.svelte`, which contains an SVG with the given path (or paths) and a label. They look a little like this:

![Example of teeline.online outline cards](/docs/assets/cards-example.png)

If you hover over a card you can watch the outline being drawn as if by an invisible hand, which I'm super fucking happy about.

The outlines were 'hand drawn' on a tablet in [Krita](https://krita.org/en/) and saved as SVGs. These were then converted into the outline objects described above. To start with this was done manually then was eventually handled by the catchily named `turnSvgsIntoOutlineObjects.js`.

The font is a digitised version of my own non-cursive handwriting. This project was partly inspired by old revision cards from studying for my [NCTJ](https://www.nctj.com/) diploma and it felt like a nice nod to that.

## Resources, kindred sites, and further reading

- [How to Get Handwriting Animation With Irregular SVG Strokes](https://css-tricks.com/how-to-get-handwriting-animation-with-irregular-svg-strokes/) by Trapti Rahangdale
- [SVG paths](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths) in MDN Web Docs
- [Teeline Mate](https://github.com/adxsoft/TeelineMate) by [@adxsoft](https://github.com/adxsoft)
- [A Searchable Teeline Dictionary](http://realerthinks.com/a-searchable-teeline-dictionary/) by Addie Kingsland
- [Teeline for the curious: a story of learning things because I can](http://realerthinks.com/teeline-for-the-curious-a-story-of-learning-things-because-i-can/) by Addie Kingsland

