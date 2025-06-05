// components/form/SingleSelectInput.tsx
import { Controller, useFormContext } from "react-hook-form";
import { Dropdown } from "primereact/dropdown";
import type { SelectInputProps } from "../../types/input";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";

export const SingleSelectInput = ({
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
          <Dropdown
            value={field.value}
            onChange={(e) => {
              console.log("Valor seleccionado", e.value);
              field.onChange(e.value);
            }}
            options={options}
            optionLabel="label"
            placeholder={placeholder ?? "Seleccione una opción"}
            className="w-full"
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
