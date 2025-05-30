// components/form/SelectInput.tsx
import { Controller, useFormContext } from "react-hook-form";
import { MultiSelect } from "primereact/multiselect";
import type { SelectInputProps } from "../../types/input";
import "primereact/resources/themes/lara-light-blue/theme.css"; // Asegúrate de importar el tema
import "primereact/resources/primereact.min.css"; // Estilos base de primereact

export const SelectInput = ({
  name,
  label,
  options,
  placeholder,
}: SelectInputProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="mb-4">
      <label className="block mb-1 font-medium">{label}</label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <MultiSelect
            value={field.value}
            onChange={(e) => field.onChange(e.value)}
            options={options}
            optionLabel="label"
            placeholder={placeholder ?? "Seleccione una opción"}
            className="w-full"
            display="chip"
          />
        )}
      />
      {errors[name] && (
        <span className="text-red-500 text-sm">
          {(errors[name] as any).message}
        </span>
      )}
    </div>
  );
};
