import { z } from 'zod';

export const PlantIdResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  species: z.string(),
  // Add other expected fields here
});

export async function fetchPlantIdData(id: string) {
  const res = await fetch(`/api/plants/${id}`);
  const data = await res.json();
  const parsed = PlantIdResponseSchema.safeParse(data);
  if (!parsed.success) throw new Error('Invalid Plant.id response');
  return parsed.data;
}
