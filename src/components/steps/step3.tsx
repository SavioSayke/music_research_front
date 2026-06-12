// src/components/steps/Step3_LikertGeneral.tsx

import { useMemo, useRef, useState } from "react";

import type { FormData } from "../../App";
import { LikertScale } from "../reusable/LikertScale";
import {
  BACK_BUTTON_CLASSES,
  BUTTON_BLOCKED_CLASSES,
  BUTTON_ENABLED_CLASSES,
  REQUIRED_MESSAGE,
  scrollToFirstInvalid,
} from "../../utils/validation";

type Props = {
  formData: FormData
  updateForm: (data: Partial<FormData>) => void
  nextStep: () => void
  prevStep: () => void
  loading?: boolean
  error?: string | null
}

type LikertKey = keyof FormData["likert"]

const questions: { key: LikertKey; text: string }[] = [
  {
    key: "influence",
    text: "Sinto minhas decisões e consumos influenciados pelo que vejo nas redes sociais.",
  },
  {
    key: "friends",
    text: "Tendo a ter interesse em consumir as mesmas músicas curtidas e compartilhadas pelos meus amigos.",
  },
  {
    key: "viral",
    text: "Geralmente consumo e descubro músicas que são virais em trends, danças, memes, entre outros.",
  },
  {
    key: "listenedViral",
    text: "Já escutei/postei uma música por ela ser viral.",
  },
  {
    key: "recommended",
    text: "Já escutei uma música que me foi recomendada e passei a escutá-la, mesmo não sendo de meu gosto preferencial.",
  },
  {
    key: "multitask",
    text: "Geralmente, escuto música fazendo alguma coisa.",
  },
  {
    key: "discovery",
    text: "Tenho descoberto mais músicas diferentes pela recomendação do que por minha busca em si.",
  },
  {
    key: "exclusiveTime",
    text: "Dedico tempo exclusivo para o consumo de música.",
  },
  {
    key: "timeDecreased",
    text: "Sinto ter diminuído o tempo que dedico apenas a escutar músicas.",
  },
  {
    key: "annoyedFast",
    text: "Enjoo rápido de músicas que viralizam muito.",
  },
  {
    key: "recognizePart",
    text: "Existem músicas que não conheço por completo, mas reconheço a parte viral se escutar.",
  },
  {
    key: "playlistsImpacted",
    text: "Minhas playlists e bibliotecas de músicas são impactadas pelo que vejo de músicas em alta.",
  },
];

const getStep3Errors = (formData: FormData) => {
  const errors: Partial<Record<keyof FormData["likert"], string>> = {};

  questions.forEach(({ key }) => {
    if (!formData.likert[key]) {
      errors[key] = REQUIRED_MESSAGE;
    }
  });

  return errors;
};

export const Step3_LikertGeneral = ({
  formData,
  updateForm,
  nextStep,
  prevStep,
  loading = false,
  error = null,
}: Props) => {
  const [submitted, setSubmitted] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const errors = useMemo(() => getStep3Errors(formData), [formData]);
  const isFormValid = Object.keys(errors).length === 0;
  const shouldShowErrors = submitted;

  const handleLikertChange = (key: keyof FormData["likert"], value: number) => {
    updateForm({
      likert: { ...formData.likert, [key]: value },
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
      <h2 className="text-2xl font-bold text-center">Suas percepções</h2>

      <p className="text-center text-gray-400">
        Responda de 1 (Discordo Totalmente) a 5 (Concordo Totalmente).
      </p>

      <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
        {questions.map((question) => (
          <LikertScale
            key={question.key}
            question={question.text}
            name={question.key}
            value={formData.likert[question.key]}
            onChange={(value) => handleLikertChange(question.key, value)}
            hasError={shouldShowErrors && !!errors[question.key]}
            errorMessage={errors[question.key]}
          />
        ))}
      </div>

      {error && (
        <div className="p-3 bg-red-900/50 border border-red-700 rounded-md text-red-200 text-sm">
          {error}
        </div>
      )}

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
          {loading ? (
            <>
              <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Iniciando...
            </>
          ) : (
            "Iniciar Teste de Músicas"
          )}
        </button>
      </div>
    </form>
  )
}
