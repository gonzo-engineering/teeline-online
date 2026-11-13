import { hydratedData } from '#lib/scripts/hydrate-outline-data.ts';

export async function GET() {
	return Response.json(hydratedData);
}
