export const isErrorWithProperty = <K extends string>(
  data: unknown,
  property: K,
): data is Record<K, string> => {
  if (typeof data !== "object" || data === null) {
    return false;
  }

  const value = (data as Record<string, unknown>)[property];
  return typeof value === "string";
};
