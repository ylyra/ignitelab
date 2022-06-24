import { FormState } from "react-hook-form";

export function hasErrors<T = unknown>(formState: FormState<T>): boolean {
  return formState.errors && Object.keys(formState.errors).length > 0;
}
