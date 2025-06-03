// src/components/form/TimeInput.tsx
import { useFormContext } from "react-hook-form";

interface TimeInputProps {
  name: string;
  label?: string;
  defaultValue?: string;
  className?: string;
  required?: boolean;
}

export const TimeInput = ({
  name,
  label,
  defaultValue,
  className = "",
  required = false,
}: TimeInputProps) => {
  const { register } = useFormContext();

  return (
    <div className={`space-y-1 ${className}`}>
      {label && (
        <label htmlFor={name} className="block text-sm font-medium text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <input
        type="time"
        id={name}
        defaultValue={defaultValue}
        {...register(name, { required })}
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
      />
    </div>
  );
};