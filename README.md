# teeline.online

[teeline.online](https://teeline.online) is a website for studying the [Teeline](https://en.wikipedia.org/wiki/Teeline_Shorthand) shorthand system. It is currently built with [SvelteKit](https://kit.svelte.dev/). To run locally download the repository then run `npm install npm` followed by `run dev -- --open`.

## Overview

Most of the site revolves around an array of outline objects, which contain all the information necessary to render 240+ specific outlines as well as generate infinite combinations. Below is an example of what one looks like.

```ts
{
		"letterGroupings": ["mm"],
		"specialOutlineMeanings": ["member"],
		"lines": [
			{
				"path": "M192.3868 456.9313c-6.7784 -7.1246 77.4725 -38.2629 101.2242 -34.7955c17.479 2.5517 37.501 10.4433 51.78 21.1152c2.376 1.7759 12.71 12.3451 14.854 12.0446c35.051 -4.9121 45.992 -39.9392 100.164 -35.9851c17.04 1.2438 40.409 8.9492 55.387 17.6952c6.964 4.0666 12.628 7.0169 18.886 12.342c1.623 1.3803 8.044 7.3629 7.852 6.6914",
				"length": 387,
				"start": {
					"x": 192.3868,
					"y": 456.9313
				},
				"end": {
					"x": 542.5339999999999,
					"y": 456.0391
				}
			}
		]
	}
```

The `letterGroupings` and `specialOutlineMeanings` values are arrays of strings rather than just strings because sometimes outlines can have multiple meanings. Each entry in the `lines` array corresponds to one line in that outline. The `start` and `end` coordindates are for a 750 by 750 canvas. This allows words to be placed relative to a central line, which is essential for certain symbols.

These outline objects can be fed into `OutlineSVG.svelte`, which contains an SVG with the given path (or paths) and a label. These in turn can be used to render cards...

![Example of teeline.online outline cards](/docs/assets/cards-example.png)

Or even entire sentences...

![Example of teeline.online outline passages](/docs/assets/passage-example.png)

If you hover over these things you can watch the outline(s) being drawn as if by an invisible hand, which I'm super fucking happy about.

The outlines were 'hand drawn' on a tablet in [Krita](https://krita.org/en/) and saved as SVGs. These were then converted into the outline objects described above. To start with this was done manually then was eventually handled by the catchily named `turnSvgsIntoOutlineObjects.mjs`.

The font is a digitised version of my own non-cursive handwriting. This project was partly inspired by old revision cards from studying for my [NCTJ](https://www.nctj.com/) diploma and it felt like a nice nod to that.

## Resources, kindred sites, and further reading

- [How to Get Handwriting Animation With Irregular SVG Strokes](https://css-tricks.com/how-to-get-handwriting-animation-with-irregular-svg-strokes/) by Trapti Rahangdale
- [SVG paths](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths) in MDN Web Docs
- [Teeline Mate](https://github.com/adxsoft/TeelineMate) by [@adxsoft](https://github.com/adxsoft)
- [A Searchable Teeline Dictionary](http://realerthinks.com/a-searchable-teeline-dictionary/) by Addie Kingsland
- [Teeline for the curious: a story of learning things because I can](http://realerthinks.com/teeline-for-the-curious-a-story-of-learning-things-because-i-can/) by Addie Kingsland

## Website image credits

- **Confused man**: [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Headscratcher.png), originally published in _The Evening Ledger_, Philadelphia, May 4 1916
- **Old book**: [Rawpixel](https://www.rawpixel.com/image/6261613/png-paper-sticker)
- **Quill and bottle**: [PublicDomainPictures.net](https://www.publicdomainpictures.net/en/view-image.php?image=75286&picture=ink-amp-feather-quill-clipart), originally drawn by Karen Arnold