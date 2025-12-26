export function normalizeObject<T extends Record<string, any>>(obj: Partial<T>, defaultValue = ""): T {
  const result: any = {};
  for (const key in obj) {
    result[key] = obj[key] ?? defaultValue;
  }
  return result;
}
