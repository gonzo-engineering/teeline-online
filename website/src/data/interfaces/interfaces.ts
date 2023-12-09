export type OutlineObject = {
	letterGroupings: string[];
	specialOutlineMeanings: string[];
	lines: readonly LineDetails[];
};

type Point = {
	readonly x: number;
	readonly y: number;
};

export type LineDetails = {
	path: string;
	length: number;
	start: Point;
	end: Point;
};

export interface SyllabusSection {
	title: string;
	description: string;
	slug: string;
	order: number;
}
