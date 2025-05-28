import { useFormContext } from 'react-hook-form';
import type { PasswordInputProps } from '../../types/input';


export const PasswordInput = ({ name, label, placeholder }: PasswordInputProps) => {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="mb-4">
      <label className="block mb-1 font-medium">{label}</label>
      <input
        type="password"
        placeholder={placeholder}
        {...register(name)}
        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
      />
      {errors[name] && (
        <span className="text-red-500 text-sm">
          {(errors[name] as any).message}
        </span>
      )}
    </div>
  );
};
