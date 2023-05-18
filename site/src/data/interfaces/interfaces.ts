export type OutlineObject = {
	letterGroupings?: string[];
	specialOutlineMeanings?: string[];
	lines: LineDetails[];
};

type LineDetails = {
	path: string;
	translateValues: number[];
};

export interface SyllabusSection {
	order: number;
	name: string;
	slug: string;
}
