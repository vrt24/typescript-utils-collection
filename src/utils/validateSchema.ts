/**
 * Validates an input against a simple schema definition.
 * Example schema:
 * { name: "string", age: "number", tags: "array" }
 */
export function validateSchema(
  input: Record<string, any>,
  schema: Record<string, "string" | "number" | "boolean" | "array">
): { ok: true } | { ok: false; errors: string[] } {
  const errors: string[] = [];

  for (const key of Object.keys(schema)) {
    const expected = schema[key];
    const value = input[key];

    if (expected === "array") {
      if (!Array.isArray(value)) errors.push(`${key} must be an array`);
      continue;
    }

    if (typeof value !== expected) {
      errors.push(`${key} must be of type ${expected}`);
    }
  }

  return errors.length === 0 ? { ok: true } : { ok: false, errors };
}
