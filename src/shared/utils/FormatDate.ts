export function formatPeriod(
  start: string,
  end: string | null | Date,
  finished: boolean
): string {
  const startYear = new Date(start).getFullYear()
  const endYear = end ? new Date(end).getFullYear() : 'Actual'

  return finished
    ? `${startYear} – ${endYear}`
    : `${startYear} – En curso`
}

export function formatYear(
  date: string
): string {
  const year = date? new Date(date).getFullYear() : 'N/A'

  return year.toString()
}


export const toDateInput = (value?: string | Date | null) => {
  if (!value) return "";
  return new Date(value).toISOString().slice(0, 10);
};
