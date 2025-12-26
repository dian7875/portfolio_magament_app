import type { FormContext, Path } from "vee-validate";

type Primitive = string | number;

export function veeBind<T extends Record<string, any>>(
  values: FormContext<T>["values"],
  setFieldValue: FormContext<T>["setFieldValue"]
) {
  return <K extends keyof T>(field: K) => ({
    modelValue: values[field],
    "onUpdate:modelValue": (value: Primitive) => {
      setFieldValue(field as unknown as Path<T>, String(value) as T[K]);
    },
  });
}
