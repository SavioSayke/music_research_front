// src/components/steps/Step5_ThankYou.tsx
import type { FormData } from "../../App";

type Props = {
  formData: FormData;
};

export const Step5_ThankYou = ({}: Props) => {
  return (
    <div className="space-y-6 text-center">
      <h2 className="text-3xl font-bold text-green-400">
        Obrigado por participar!
      </h2>
      <p className="text-lg text-gray-300">
        Sua contribuição é muito valiosa para nossa pesquisa. Seus dados foram
        enviados.
      </p>

      {/* Opcional: Bloco de depuração para você ver os dados coletados */}
      {/*<div className="text-left bg-gray-900 p-4 rounded-md max-h-96 overflow-auto">
        <h4 className="font-semibold mb-2">Dados Coletados (Debug):</h4>
        <pre className="text-xs text-gray-400">
          {JSON.stringify(formData, null, 2)}
        </pre>
      </div> */}
    </div>
  );
};
