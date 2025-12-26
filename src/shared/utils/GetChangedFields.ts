export function getChangedFields<T extends Record<string, any>>(
  initial: T,
  current: T
): Partial<T> {
  const changed: Partial<T> = {};

  for (const key in current) {
    const a = initial[key];
    const b = current[key];

    if (
      typeof a === "string" &&
      typeof b === "string" &&
      a.trim() !== b.trim()
    ) {
      changed[key] = b.trim();
    } else if (a !== b) {
      changed[key] = b;
    }
  }

  return changed;
}
