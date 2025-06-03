// src/components/form/TextAreaInput.tsx
import { useFormContext } from "react-hook-form";

interface TextAreaInputProps {
  name: string;
  label?: string;
  placeholder?: string;
  rows?: number;
  className?: string;
}

export const TextAreaInput = ({
  name,
  label,
  placeholder,
  rows = 3,
  className = "",
}: TextAreaInputProps) => {
  const { register } = useFormContext();

  return (
    <div className={`space-y-1 ${className}`}>
      {label && (
        <label htmlFor={name} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <textarea
        id={name}
        rows={rows}
        placeholder={placeholder}
        {...register(name)}
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
      />
    </div>
  );
};