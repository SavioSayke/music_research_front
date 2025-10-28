// src/components/steps/Step4_MusicPlayer.tsx
import { useState } from "react";
import { SpotifyPlayer } from "../reusable/Player";
import type { FormData } from "../../App";
import { RadioGroup } from "../reusable/RadioGroup";

type Song = {
  id: number;
  spotifyId: string;
  name: string;
};

type Props = {
  song: Song;
  onSubmit: (musicAnswer: FormData["musicAnswers"][0]) => void;
  prevStep: () => void; // Para voltar ao Step 3
};

type MusicAnswerState = Omit<
  FormData["musicAnswers"][0],
  "songId" | "spotifyId"
>;

const initialMusicAnswer: MusicAnswerState = {
  heardBefore: "",
  knowArtist: "",
  knowAlbum: "",
  heardComplete: "",
  stoppedToListen: "",
  heard3Songs: "",
  encouragedToListenAlbum: "",
};

const yesNoOptions = ["Sim", "Não", "Não sei"];

export const Step4_MusicPlayer = ({ song, onSubmit, prevStep }: Props) => {
  const [answers, setAnswers] = useState<MusicAnswerState>(initialMusicAnswer);

  const handleChange = (key: keyof MusicAnswerState, value: string) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      songId: song.id,
      spotifyId: song.spotifyId,
      ...answers,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl font-bold text-center">{song.name}</h2>
      <p className="text-center text-gray-400">
        Por favor, ouça a música abaixo antes de responder.
      </p>

      <SpotifyPlayer trackId={song.spotifyId} />

      <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-2">
        <RadioGroup
          label="Você já escutou essa música?"
          name="heardBefore"
          options={yesNoOptions}
          value={answers.heardBefore}
          onChange={(val) => handleChange("heardBefore", val)}
        />
        <RadioGroup
          label="Você conhece o autor da música?"
          name="knowArtist"
          options={yesNoOptions}
          value={answers.knowArtist}
          onChange={(val) => handleChange("knowArtist", val)}
        />
        <RadioGroup
          label="Você conhece o álbum ao qual pertence essa música?"
          name="knowAlbum"
          options={yesNoOptions}
          value={answers.knowAlbum}
          onChange={(val) => handleChange("knowAlbum", val)}
        />
        <RadioGroup
          label="Você já escutou essa música por completo?"
          name="heardComplete"
          options={yesNoOptions}
          value={answers.heardComplete}
          onChange={(val) => handleChange("heardComplete", val)}
        />
        <RadioGroup
          label="Você já parou para escutar essa música por completo?"
          name="stoppedToListen"
          options={yesNoOptions}
          value={answers.stoppedToListen}
          onChange={(val) => handleChange("stoppedToListen", val)}
        />
        <RadioGroup
          label="Já escutou ao menos 3 músicas diferentes deste mesmo autor?"
          name="heard3Songs"
          options={yesNoOptions}
          value={answers.heard3Songs}
          onChange={(val) => handleChange("heard3Songs", val)}
        />
        <RadioGroup
          label="Você se sente encorajado a escutar um álbum inteiro deste autor?"
          name="encouragedToListenAlbum"
          options={yesNoOptions}
          value={answers.encouragedToListenAlbum}
          onChange={(val) => handleChange("encouragedToListenAlbum", val)}
        />
      </div>

      <div className="flex justify-between pt-4">
        {/* O botão "Voltar" aqui te levaria para o Step 3 (Likert) */}
        <button
          type="button"
          onClick={prevStep}
          className="bg-gray-600 text-white font-bold py-2 px-6 rounded-md hover:bg-gray-500 transition-all"
        >
          Voltar (Percepções)
        </button>
        <button
          type="submit"
          className="bg-indigo-600 text-white font-bold py-2 px-6 rounded-md hover:bg-indigo-700 transition-all"
        >
          Próxima Música
        </button>
      </div>
    </form>
  );
};
