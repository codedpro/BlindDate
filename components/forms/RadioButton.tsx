interface RadioButtonProps {
    id: string;
    name: string;
    value: string;
    label: string;
    checked: boolean;
    onChange: (value: string) => void;
  }
  
  export const RadioButton: React.FC<RadioButtonProps> = ({
    id,
    name,
    value,
    label,
    checked,
    onChange,
  }) => {
    return (
      <label
        htmlFor={id}
        className={`flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium cursor-pointer transition
            ${
              checked
                ? "bg-[#222223] text-white border border-[#4caf50]"
                : "bg-[#1c1c1d] text-gray-300 hover:bg-[#222223]"
            }`}
      >
        <input
          id={id}
          type="radio"
          name={name}
          value={value}
          checked={checked}
          onChange={() => onChange(value)}
          className="hidden"
        />
        <span
          className={`w-5 h-5 flex items-center justify-center rounded-full border-2 transition
              ${
                checked
                  ? "bg-[#4caf50] border-[#4caf50]"
                  : "border-gray-500 hover:border-gray-400"
              }`}
        >
          {checked && (
            <span className="w-2.5 h-2.5 bg-white rounded-full"></span>
          )}
        </span>
        {label}
      </label>
    );
  };
  