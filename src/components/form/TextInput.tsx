import { useFormContext } from "react-hook-form";
import type { TextInputProps } from "../../types/input";

export const TextInput = ({
  name,
  label,
  placeholder,
  type = "text",
  isDark,
  ...rest
}: TextInputProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="mb-4">
      <label
        className={`block mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}
      >
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        {...register(name)}
        {...rest}
        className={`w-full px-3 py-2 border rounded-md ${
          isDark
            ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
            : "bg-white border-gray-300 text-gray-800"
        }`}
      />
      {errors[name] && (
        <span className="text-red-500 text-sm">
          {(errors[name] as any).message}
        </span>
      )}
    </div>
  );
};
