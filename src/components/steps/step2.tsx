// src/components/steps/Step2_MediaUsage.tsx

import { useMemo, useRef, useState } from "react";
import type { ChangeEvent } from "react";

import type { FormData } from "../../App";
import { RadioGroup } from "../reusable/RadioGroup";
import {
  BACK_BUTTON_CLASSES,
  BUTTON_BLOCKED_CLASSES,
  BUTTON_ENABLED_CLASSES,
  ERROR_TEXT_CLASSES,
  REQUIRED_MESSAGE,
  scrollToFirstInvalid,
} from "../../utils/validation";

type Props = {
  formData: FormData;
  updateForm: (data: Partial<FormData>) => void;
  nextStep: () => void;
  prevStep: () => void;
};

const timeOptions = [
  "Até 1 hora",
  "De 1 a 2 horas",
  "De 2 a 3 horas",
  "4 horas +",
];

const getStep2Errors = (formData: FormData) => {
  const errors: Partial<Record<"socialMedia" | "screenTime" | "musicTime", string>> = {};
  const hasSocialMediaSelected = Object.values(formData.socialMedia).some(Boolean);

  if (!hasSocialMediaSelected) {
    errors.socialMedia = REQUIRED_MESSAGE;
  }

  if (!formData.screenTime) {
    errors.screenTime = REQUIRED_MESSAGE;
  }

  if (!formData.musicTime) {
    errors.musicTime = REQUIRED_MESSAGE;
  }

  return errors;
};

export const Step2_MediaUsage = ({
  formData,
  updateForm,
  nextStep,
  prevStep,
}: Props) => {
  const [submitted, setSubmitted] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const errors = useMemo(() => getStep2Errors(formData), [formData]);
  const isFormValid = Object.keys(errors).length === 0;
  const shouldShowErrors = submitted;

  const handleSocialChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;

    updateForm({
      socialMedia: { ...formData.socialMedia, [name]: checked },
    });
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
      <h2 className="text-2xl font-bold text-center">Seus hábitos</h2>

      <fieldset
        className={`space-y-2 rounded-md ${
          shouldShowErrors && errors.socialMedia
            ? "border border-red-500 p-3"
            : "border border-transparent"
        }`}
        data-invalid-field={shouldShowErrors && errors.socialMedia ? "true" : undefined}
        tabIndex={shouldShowErrors && errors.socialMedia ? -1 : undefined}
      >
        <legend className="text-lg font-medium text-gray-100">
          Quais redes sociais você mais consome?
        </legend>

        {[
          { label: "Tiktok", key: "tiktok" },
          { label: "Instagram (Reels)", key: "instagram" },
          { label: "Youtube (Shorts)", key: "youtube" },
        ].map(({ label, key }) => (
          <label
            key={key}
            className="flex items-center space-x-2 p-3 bg-gray-700 rounded-md cursor-pointer hover:bg-gray-600"
          >
            <input
              type="checkbox"
              name={key}
              checked={formData.socialMedia[key as keyof typeof formData.socialMedia]}
              onChange={handleSocialChange}
              className="form-checkbox text-indigo-500 bg-gray-800 border-gray-600 rounded focus:ring-indigo-500"
            />
            <span className="text-gray-200">{label}</span>
          </label>
        ))}

        {shouldShowErrors && errors.socialMedia && (
          <p className={ERROR_TEXT_CLASSES}>{errors.socialMedia}</p>
        )}
      </fieldset>

      <RadioGroup
        label="Quantidade de tempo em redes sociais por dia:"
        name="screenTime"
        options={timeOptions}
        value={formData.screenTime}
        onChange={(value) => updateForm({ screenTime: value })}
        hasError={shouldShowErrors && !!errors.screenTime}
        errorMessage={errors.screenTime}
      />

      <RadioGroup
        label="Quanto tempo dedica a escutar música diariamente:"
        name="musicTime"
        options={timeOptions}
        value={formData.musicTime}
        onChange={(value) => updateForm({ musicTime: value })}
        hasError={shouldShowErrors && !!errors.musicTime}
        errorMessage={errors.musicTime}
      />

      <div className="flex justify-between pt-4">
        <button type="button" onClick={prevStep} className={BACK_BUTTON_CLASSES}>
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
