type SyllabusSection = {
	order: number;
	name: string;
	slug: string;
};

export const syllabusDetails: SyllabusSection[] = [
	{
		order: 1,
		name: 'Introduction',
		slug: 'introduction'
	},
	{
		order: 2,
		name: 'The alphabet',
		slug: 'the-alphabet'
	},
	{
		order: 3,
		name: 'Letter positioning and hierarchy',
		slug: 'letter-positioning-and-hierarchy'
	},
	{
		order: 4,
		name: 'Disemvowelment',
		slug: 'disemvowelment'
	},
	{
		order: 5,
		name: 'Silent and double letters',
		slug: 'silent-and-double-letters'
	},
	{
		order: 6,
		name: 'Connecting letters',
		slug: 'connecting-letters'
	},
	{
		order: 7,
		name: 'Special outlines',
		slug: 'special-outlines'
	}
];
