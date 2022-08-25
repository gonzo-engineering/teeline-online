export function prettify(outlineNames: string[]): string {
	return outlineNames.toString().replace(/,/g, ' / ');
}
