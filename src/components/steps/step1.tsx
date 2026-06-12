import { useMemo, useRef, useState } from "react";
import type { ChangeEvent } from "react";

import type { FormData } from "../../App";
import {
  BACK_BUTTON_CLASSES,
  BUTTON_BLOCKED_CLASSES,
  BUTTON_ENABLED_CLASSES,
  ERROR_TEXT_CLASSES,
  REQUIRED_MESSAGE,
  formatLocation,
  isValidAge,
  onlyLettersAndSpaces,
  onlyLettersUppercase,
  onlyNumbers,
  scrollToFirstInvalid,
} from "../../utils/validation";

type Props = {
  formData: FormData;
  updateForm: (data: Partial<FormData>) => void;
  nextStep: () => void;
  prevStep: () => void;
};

type FormInputProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  inputMode?: "numeric" | "text";
  maxLength?: number;
  autoCapitalize?: string;
};

const FormInput = ({
  label,
  value,
  onChange,
  error,
  inputMode = "text",
  maxLength,
  autoCapitalize,
}: FormInputProps) => (
  <div data-invalid-field={error ? "true" : undefined} tabIndex={error ? -1 : undefined}>
    <label className="block text-sm font-medium text-gray-300 mb-1">
      {label}
    </label>
    <input
      type="text"
      value={value}
      onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
      inputMode={inputMode}
      maxLength={maxLength}
      autoCapitalize={autoCapitalize}
      aria-invalid={!!error}
      className={`w-full bg-gray-700 rounded-md p-2 text-white focus:ring-indigo-500 focus:border-indigo-500 ${
        error ? "border border-red-500" : "border border-gray-600"
      }`}
    />
    {error && <p className={ERROR_TEXT_CLASSES}>{error}</p>}
  </div>
);

const getStep1Errors = (formData: FormData) => {
  const errors: Partial<Record<"age" | "sex" | "city" | "state", string>> = {};

  if (!formData.age.trim()) {
    errors.age = REQUIRED_MESSAGE;
  } else if (!isValidAge(formData.age)) {
    errors.age = "Idade inválida.";
  }

  if (!formData.sex) {
    errors.sex = REQUIRED_MESSAGE;
  }

  if (!formData.city.trim()) {
    errors.city = REQUIRED_MESSAGE;
  }

  if (!formData.state.trim()) {
    errors.state = REQUIRED_MESSAGE;
  } else if (formData.state.trim().length !== 2) {
  errors.state = "Estado inválido.";
  }

  return errors;
};

export const Step1_UserInfo = ({
  formData,
  updateForm,
  nextStep,
  prevStep,
}: Props) => {
  const [submitted, setSubmitted] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const sexOptions = ["Feminino", "Masculino", "Outro", "Prefiro não dizer"];

  const errors = useMemo(() => getStep1Errors(formData), [formData]);
  const isFormValid = Object.keys(errors).length === 0;
  const shouldShowErrors = submitted;

  const updateLocation = (city: string, state: string) => {
    updateForm({
      city,
      state,
      location: formatLocation(city, state),
    });
  };

  const handleAgeChange = (value: string) => {
    updateForm({ age: onlyNumbers(value).slice(0, 3) });
  };

  const handleCityChange = (value: string) => {
    updateLocation(onlyLettersAndSpaces(value, 32).toUpperCase(), formData.state);
  };

  const handleStateChange = (value: string) => {
    updateLocation(formData.city, onlyLettersUppercase(value, 2));
  };

  const handleNext = () => {
    setSubmitted(true);

    if (!isFormValid) {
      requestAnimationFrame(() => scrollToFirstInvalid(formRef.current));
      return;
    }

    nextStep();
  };

  return (
    <form ref={formRef} onSubmit={(e) => e.preventDefault()} className="space-y-6">
      <h2 className="text-2xl font-bold text-center">Sobre você</h2>

      <FormInput
        label="Idade"
        value={formData.age}
        onChange={handleAgeChange}
        inputMode="numeric"
        maxLength={3}
        error={shouldShowErrors ? errors.age : undefined}
      />

      <fieldset
        className={`rounded-md ${
          shouldShowErrors && errors.sex ? "border border-red-500 p-3" : "border border-transparent"
        }`}
        data-invalid-field={shouldShowErrors && errors.sex ? "true" : undefined}
        tabIndex={shouldShowErrors && errors.sex ? -1 : undefined}
      >
        <legend className="block text-sm font-medium text-gray-300 mb-1">
          Sexo
        </legend>
        <div className="flex flex-wrap gap-2 pt-2">
          {sexOptions.map((option) => (
            <label
              key={option}
              className="flex items-center space-x-2 p-3 bg-gray-700 rounded-md cursor-pointer hover:bg-gray-600"
            >
              <input
                type="radio"
                name="sex"
                value={option}
                checked={formData.sex === option}
                onChange={() => updateForm({ sex: option })}
                className="form-radio text-indigo-500 bg-gray-800 border-gray-600 focus:ring-indigo-500"
              />
              <span className="text-gray-200">{option}</span>
            </label>
          ))}
        </div>
        {shouldShowErrors && errors.sex && (
          <p className={ERROR_TEXT_CLASSES}>{errors.sex}</p>
        )}
      </fieldset>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <FormInput
            label="Cidade"
            value={formData.city}
            onChange={handleCityChange}
            maxLength={32}
            autoCapitalize="characters"
            error={shouldShowErrors ? errors.city : undefined}
          />
        </div>

        <FormInput
          label="Estado"
          value={formData.state}
          onChange={handleStateChange}
          maxLength={2}
          autoCapitalize="characters"
          error={shouldShowErrors ? errors.state : undefined}
        />
      </div>

      <FormInput
        label="Instituição (Opcional)"
        value={formData.institution}
        onChange={(value) => updateForm({ institution: value })}
      />

      <div className="flex justify-between pt-4">
        <button
          type="button"
          onClick={prevStep}
          className={BACK_BUTTON_CLASSES}
        >
          Voltar
        </button>

        <button
          type="button"
          onClick={handleNext}
          aria-disabled={!isFormValid}
          className={isFormValid ? BUTTON_ENABLED_CLASSES : BUTTON_BLOCKED_CLASSES}
        >
          Próximo
        </button>
      </div>
    </form>
  );
};
