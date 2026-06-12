export const REQUIRED_MESSAGE = "Campo obrigatório*";

export const BUTTON_ENABLED_CLASSES =
  "bg-indigo-600 text-white font-bold py-2 px-6 rounded-md hover:bg-indigo-700 transition-all";

export const BUTTON_BLOCKED_CLASSES =
  "bg-gray-700 text-gray-300 font-bold py-2 px-6 rounded-md opacity-60 cursor-not-allowed transition-all";

export const BACK_BUTTON_CLASSES =
  "bg-gray-600 text-white font-bold py-2 px-6 rounded-md hover:bg-gray-500 transition-all";

export const ERROR_TEXT_CLASSES = "mt-1 text-sm font-medium text-red-400";

export const scrollToFirstInvalid = (container: HTMLElement | null) => {
  const firstInvalid = container?.querySelector<HTMLElement>(
    '[data-invalid-field="true"]'
  );

  firstInvalid?.scrollIntoView({ behavior: "smooth", block: "center" });
  firstInvalid?.focus?.({ preventScroll: true });
};

export const isValidAge = (age: string) => {
  if (!/^\d+$/.test(age.trim())) return false;

  const normalizedAge = Number(age);
  return normalizedAge >= 1 && normalizedAge <= 150;
};

export const onlyNumbers = (value: string) => value.replace(/\D/g, "");

export const onlyLettersAndSpaces = (value: string, maxLength: number) =>
  Array.from(value)
    .filter((char) => /^[\p{L}\s]$/u.test(char))
    .join("")
    .slice(0, maxLength);

export const onlyLettersUppercase = (value: string, maxLength: number) =>
  Array.from(value)
    .filter((char) => /^[\p{L}]$/u.test(char))
    .join("")
    .toUpperCase()
    .slice(0, maxLength);

export const formatLocation = (city: string, state: string) => {
  const normalizedCity = city.trim().toUpperCase();
  const normalizedState = state.trim().toUpperCase();

  if (!normalizedCity && !normalizedState) return "";
  if (!normalizedCity) return normalizedState;
  if (!normalizedState) return normalizedCity;

  return `${normalizedCity}/${normalizedState}`;
};
