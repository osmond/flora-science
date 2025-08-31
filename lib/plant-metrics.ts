export const MS_PER_DAY = 1000 * 60 * 60 * 24

export function calculateNutrientAvailability(
  lastFertilized: string,
  nutrientLevel: number = 100,
  asOf: Date = new Date()
): number {
  const lastDate = new Date(`${lastFertilized} ${asOf.getFullYear()}`)
  if (isNaN(lastDate.getTime())) return nutrientLevel
  const diffDays = Math.floor((asOf.getTime() - lastDate.getTime()) / MS_PER_DAY)
  const decayed = Math.max(0, Math.min(100, nutrientLevel - diffDays * 2))
  return decayed
}
