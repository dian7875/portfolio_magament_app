export function getChangedFields<T extends Record<string, any>>(
  initial: T,
  current: T
): Partial<T> {
  const changed: Partial<T> = {};

  for (const key in current) {
    const a = initial[key];
    const b = current[key];

    if (typeof a === "string" && typeof b === "string") {
      if (a.trim() !== b.trim()) {
        changed[key] = b.trim();
      }
    }
    else if (Array.isArray(a) && Array.isArray(b)) {
      const aSorted = [...a].sort();
      const bSorted = [...b].sort();
      if (aSorted.length !== bSorted.length || !aSorted.every((v, i) => v === bSorted[i])) {
        changed[key] = b;
      }
    }
    else if ((a ?? null) !== (b ?? null)) {
      changed[key] = b;
    }
  }

  return changed;
}
