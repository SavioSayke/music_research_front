// src/components/steps/Step2_MediaUsage.tsx
import type { FormData } from "../../App";
import { RadioGroup } from "../reusable/RadioGroup";

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

export const Step2_MediaUsage = ({
  formData,
  updateForm,
  nextStep,
  prevStep,
}: Props) => {
  const handleSocialChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    updateForm({
      socialMedia: { ...formData.socialMedia, [name]: checked },
    });
  };

  return (
    <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
      <h2 className="text-2xl font-bold text-center">Seus Hábitos</h2>

      {/* Checkboxes */}
      <fieldset className="space-y-2">
        <legend className="text-lg font-medium text-gray-100">
          Quais redes sociais você mais consome?
        </legend>
        {["Tiktok", "Instagram (Reels)", "Youtube (Shorts)"].map((name) => {
          const key = name
            .split(" ")[0]
            .toLowerCase() as keyof typeof formData.socialMedia;
          return (
            <label
              key={key}
              className="flex items-center space-x-2 p-3 bg-gray-700 rounded-md cursor-pointer hover:bg-gray-600"
            >
              <input
                type="checkbox"
                name={key}
                checked={formData.socialMedia[key]}
                onChange={handleSocialChange}
                className="form-checkbox text-indigo-500 bg-gray-800 border-gray-600 rounded focus:ring-indigo-500"
              />
              <span className="text-gray-200">{name}</span>
            </label>
          );
        })}
      </fieldset>

      {/* Radio Groups */}
      <RadioGroup
        label="Quantidade de tempo em redes sociais por dia:"
        name="screenTime"
        options={timeOptions}
        value={formData.screenTime}
        onChange={(val) => updateForm({ screenTime: val })}
      />
      <RadioGroup
        label="Quanto tempo dedica a escutar música diariamente:"
        name="musicTime"
        options={timeOptions}
        value={formData.musicTime}
        onChange={(val) => updateForm({ musicTime: val })}
      />

      <div className="flex justify-between pt-4">
        <button
          type="button"
          onClick={prevStep}
          className="bg-gray-600 text-white font-bold py-2 px-6 rounded-md hover:bg-gray-500 transition-all"
        >
          Voltar
        </button>
        <button
          type="button"
          onClick={nextStep}
          className="bg-indigo-600 text-white font-bold py-2 px-6 rounded-md hover:bg-indigo-700 transition-all"
        >
          Próximo
        </button>
      </div>
    </form>
  );
};
