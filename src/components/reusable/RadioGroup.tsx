// src/components/reusable/RadioGroup.tsx

import { ERROR_TEXT_CLASSES } from "../../utils/validation";

type Props = {
  label: string;
  name: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  hasError?: boolean;
  errorMessage?: string;
};

export const RadioGroup = ({
  label,
  name,
  options,
  value,
  onChange,
  hasError = false,
  errorMessage,
}: Props) => (
  <fieldset
    className={`space-y-2 rounded-md ${
      hasError ? "border border-red-500 p-3" : "border border-transparent"
    }`}
    data-invalid-field={hasError ? "true" : undefined}
    tabIndex={hasError ? -1 : undefined}
  >
    <legend className="text-lg font-medium text-gray-100">{label}</legend>

    {options.map((option) => (
      <label
        key={option}
        className="flex items-center space-x-2 p-3 bg-gray-700 rounded-md cursor-pointer hover:bg-gray-600"
      >
        <input
          type="radio"
          name={name}
          value={option}
          checked={value === option}
          onChange={(e) => onChange(e.target.value)}
          className="form-radio text-indigo-500 bg-gray-800 border-gray-600 focus:ring-indigo-500"
        />
        <span className="text-gray-200">{option}</span>
      </label>
    ))}

    {hasError && errorMessage && <p className={ERROR_TEXT_CLASSES}>{errorMessage}</p>}
  </fieldset>
);
