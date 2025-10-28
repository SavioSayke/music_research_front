// src/components/steps/Step0_Consent.tsx
import type { FormData } from "../../App"; // Importe o tipo principal

type Props = {
  formData: FormData; // Para ler o estado do checkbox
  updateForm: (data: Partial<FormData>) => void; // Para atualizar o estado
  nextStep: () => void;
};

export const Step0_Consent = ({ formData, updateForm, nextStep }: Props) => {
  const handleConsentChange = (isChecked: boolean) => {
    updateForm({ hasConsented: isChecked });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-center text-white">
        Termo de Consentimento
      </h2>

      <div className="text-left text-gray-300 space-y-4 p-5 bg-gray-700 rounded-lg border border-gray-600">
        <p className="text-lg">Bem-vindo(a) à nossa pesquisa!</p>
        <p>
          Este formulário faz parte de um projeto de pesquisa acadêmica sobre o
          impacto das redes sociais no consumo de música.
        </p>
        <p>
          Sua participação é <strong>totalmente anônima</strong> e voluntária.
          Nenhum dado de identificação pessoal, como nome ou e-mail, será
          solicitado ou armazenado.
        </p>
        <p>
          Os dados coletados serão usados exclusivamente para fins científicos
          no desenvolvimento de um projeto de Iniciação Científica (PIBIC) da{" "}
          <strong>Universidade Estadual da Paraíba (UEPB)</strong>, com fomento
          da <strong>FAPESQ</strong>.
        </p>
        <p>
          Você pode desistir de participar a qualquer momento, bastando fechar
          esta página.
        </p>
      </div>

      {/* --- O Checkbox de Consentimento --- */}
      <fieldset
        className="flex items-center space-x-3 p-4 bg-gray-700 rounded-md hover:bg-gray-600 transition-all cursor-pointer"
        onClick={() => handleConsentChange(!formData.hasConsented)} // Permite clicar em todo o container
      >
        <input
          type="checkbox"
          id="consent"
          name="consent"
          checked={formData.hasConsented}
          onChange={(e) => handleConsentChange(e.target.checked)}
          className="form-checkbox h-5 w-5 text-indigo-500 bg-gray-800 border-gray-600 rounded focus:ring-indigo-500 cursor-pointer"
        />
        <label htmlFor="consent" className="text-gray-200 cursor-pointer">
          Li, compreendi e concordo em participar da pesquisa.
        </label>
      </fieldset>

      {/* --- O Botão de Navegação --- */}
      <div className="flex justify-end pt-4">
        <button
          onClick={nextStep}
          disabled={!formData.hasConsented} // Habilita/Desabilita o botão
          className="bg-indigo-600 text-white font-bold py-2 px-6 rounded-md transition-all
                     disabled:bg-gray-500 disabled:opacity-50 disabled:cursor-not-allowed
                     hover:enabled:bg-indigo-700"
        >
          Concordo e Continuar
        </button>
      </div>
    </div>
  );
};
