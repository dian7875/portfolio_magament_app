export function formatPeriod(
  start: string,
  end: string | null,
  finished: boolean
): string {
  const startYear = new Date(start).getFullYear()
  const endYear = end ? new Date(end).getFullYear() : 'Actual'

  return finished
    ? `${startYear} – ${endYear}`
    : `${startYear} – En curso`
}