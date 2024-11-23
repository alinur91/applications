import { UseFormRegister, FieldValues, Path } from "react-hook-form";

type InputProps<T extends FieldValues> = {
  label: string;
  name: Path<T>;
  type?: string;
  placeholder?: string;
  error?: string;
  register: UseFormRegister<T>;
  validation?: object;
};

const Input = <T extends FieldValues>({
  label,
  name,
  type = "text",
  placeholder,
  error,
  register,
  validation = {},
}: InputProps<T>) => {
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
        placeholder={placeholder}
        {...register(name, validation)}
        className={`mt-2 block w-full px-4 py-2 border ${
          error ? "border-red-500" : "border-gray-300"
        } rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none`}
      />
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
};

export default Input;
