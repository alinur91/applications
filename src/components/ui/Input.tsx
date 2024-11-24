import { UseFormRegister, FieldValues, Path } from "react-hook-form";

type InputProps<T extends FieldValues> = {
  label: string;
  name: Path<T>;
  type?: string;
  placeholder?: string;
  error?: string;
  register: UseFormRegister<T>;
  validation?: object;
  disabled?: boolean;
};

const Input = <T extends FieldValues>({
  label,
  name,
  type = "text",
  placeholder,
  error,
  register,
  validation = {},
  disabled = false,
}: InputProps<T>) => {
  const baseClass =
    "mt-2 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:outline-none";
  const enabledClass =
    "bg-white text-gray-900 border-gray-300 focus:ring-blue-500 focus:border-blue-500";
  const disabledClass =
    "bg-gray-100 text-gray-500 cursor-not-allowed border-gray-300";
  const errorClass = "border-red-500";

  // Conditionally combine classes
  const inputClass = `${baseClass} ${disabled ? disabledClass : enabledClass} ${
    error ? errorClass : ""
  }`;

  return (
    <div className="mb-6">
      <label
        htmlFor={name as string}
        className="block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <input
        id={name as string}
        type={type}
        disabled={disabled}
        placeholder={placeholder}
        {...register(name, validation)}
        className={inputClass}
      />
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
};

export default Input;
