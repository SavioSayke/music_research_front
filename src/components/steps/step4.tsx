// src/components/steps/Step4_MusicPlayer.tsx

import { useMemo, useRef, useState } from "react";
import type { FormEvent } from "react";

import { SpotifyPlayer } from "../reusable/Player";
import type { FormData } from "../../App";
import { RadioGroup } from "../reusable/RadioGroup";
import {
  BACK_BUTTON_CLASSES,
  BUTTON_BLOCKED_CLASSES,
  BUTTON_ENABLED_CLASSES,
  REQUIRED_MESSAGE,
  scrollToFirstInvalid,
} from "../../utils/validation";

type Song = {
  id: number;
  spotifyId: string;
  name: string;
};

type Props = {
  song: Song;
  onSubmit: (musicAnswer: FormData["musicAnswers"][0]) => void;
  prevStep: () => void;
};

type MusicAnswerState = Omit<
  FormData["musicAnswers"][0],
  "songId" | "spotifyId"
>

const initialMusicAnswer: MusicAnswerState = {
  heardBefore: "",
  knowArtist: "",
  knowAlbum: "",
  heardComplete: "",
  stoppedToListen: "",
  heard3Songs: "",
  encouragedToListenAlbum: "",
}

const yesNoOptions = ["Sim", "Não", "Não sei"];

const questions: { key: keyof MusicAnswerState; label: string }[] = [
  { key: "heardBefore", label: "Você já escutou essa música?" },
  { key: "knowArtist", label: "Você conhece o autor da música?" },
  { key: "knowAlbum", label: "Você conhece o álbum ao qual pertence essa música?" },
  { key: "heardComplete", label: "Você já escutou essa música por completo?" },
  { key: "stoppedToListen", label: "Você parou para escutar essa música por completo?" },
  { key: "heard3Songs", label: "Já escutou ao menos 3 músicas diferentes deste mesmo autor?" },
  { key: "encouragedToListenAlbum", label: "Você se sente encorajado a escutar um álbum inteiro deste autor?" },
];

const getStep4Errors = (answers: MusicAnswerState) => {
  const errors: Partial<Record<keyof MusicAnswerState, string>> = {};

  questions.forEach(({ key }) => {
    if (!answers[key]) {
      errors[key] = REQUIRED_MESSAGE;
    }
  });

  return errors;
};

export const Step4_MusicPlayer = ({ song, onSubmit, prevStep }: Props) => {
  const [answers, setAnswers] = useState<MusicAnswerState>(initialMusicAnswer);
  const [submitted, setSubmitted] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const errors = useMemo(() => getStep4Errors(answers), [answers]);
  const isFormValid = Object.keys(errors).length === 0;
  const shouldShowErrors = submitted;

  const handleChange = (key: keyof MusicAnswerState, value: string) => {
    setAnswers((prev) => ({ ...prev, [key]: value }))
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    if (!isFormValid) {
      requestAnimationFrame(() => scrollToFirstInvalid(formRef.current));
      return;
    }

    onSubmit({
      songId: currentIndex,
      spotifyId: stimulus.trackId,
      ...answers,
    })
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl font-bold text-center">{song.name}</h2>

      <p className="text-center text-gray-400">
        Por favor, ouça a música abaixo antes de responder.
        <br />
        <span className="text-sm">
          Música {currentIndex + 1} de {totalStimuli}
        </span>
      </p>

      <SpotifyPlayer
        trackId={stimulus.trackId}
        onPlay={(trackId) => onPlay(trackId, currentIndex)}
      />

      <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-2">
        {questions.map((question) => (
          <RadioGroup
            key={question.key}
            label={question.label}
            name={question.key}
            options={yesNoOptions}
            value={answers[question.key]}
            onChange={(value) => handleChange(question.key, value)}
            hasError={shouldShowErrors && !!errors[question.key]}
            errorMessage={errors[question.key]}
          />
        ))}
      </div>

      <div className="flex justify-between pt-4 gap-4">
        <button type="button" onClick={prevStep} className={BACK_BUTTON_CLASSES}>
          Voltar
        </button>

        <button
          type="submit"
          aria-disabled={!isFormValid}
          className={isFormValid ? BUTTON_ENABLED_CLASSES : BUTTON_BLOCKED_CLASSES}
        >
          {currentIndex < totalStimuli - 1 ? "Próxima Música" : "Finalizar"}
        </button>
      </div>
    </form>
  )
}
