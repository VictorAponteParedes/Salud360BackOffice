import { useFormContext } from 'react-hook-form';
import type { SelectInputProps } from '../../types/input';


export const SelectInput = ({ name, label, options, placeholder }: SelectInputProps) => {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="mb-4">
      <label className="block mb-1 font-medium">{label}</label>
      <select
        {...register(name)}
        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
      >
        <option value="">{placeholder ?? 'Seleccione una opción'}</option>
        {options.map(({ label, value }) => (
          <option key={value} value={value}>{label}</option>
        ))}
      </select>
      {errors[name] && (
        <span className="text-red-500 text-sm">
          {(errors[name] as any).message}
        </span>
      )}
    </div>
  );
};
