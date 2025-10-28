// src/components/reusable/LikertScale.tsx

type Props = {
  question: string;
  name: string;
  value: number;
  onChange: (value: number) => void;
};

const options = [1, 2, 3, 4, 5];

export const LikertScale = ({ question, name, value, onChange }: Props) => (
  <div className="p-4 bg-gray-700/50 rounded-lg border border-gray-600/30">
    <p className="text-lg text-gray-100 mb-3">{question}</p>
    <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0 sm:space-x-2">
      <span className="text-sm text-gray-400">Discordo Totalmente</span>
      <div className="flex space-x-2">
        {options.map((option) => (
          <label
            key={option}
            className={`w-10 h-10 rounded-md font-bold transition-all flex items-center justify-center cursor-pointer
              ${
                value === option
                  ? "bg-white text-gray-900 scale-110"
                  : "bg-gray-800 text-gray-200 hover:bg-gray-700"
              }`}
          >
            <input
              type="radio"
              id={`${name}-${option}`}
              name={name}
              value={option}
              checked={value === option}
              onChange={() => onChange(option)}
              className="opacity-0 w-0 h-0 absolute"
            />
            {option}
          </label>
        ))}
      </div>

      <span className="text-sm text-gray-400">Concordo Totalmente</span>
    </div>
  </div>
);
