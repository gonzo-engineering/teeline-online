import type { SyllabusSection } from './interfaces/interfaces';

const learnSections: Record<string, any> = Object.values(
	import.meta.glob('../../learn-content/*.svx', {
		eager: true
	})
);

export const syllabusMetadata: SyllabusSection[] = learnSections
	.map((section) => section.metadata)
	.sort((a, b) => a.order - b.order);
