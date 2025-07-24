// src/views/GeneralSettings.tsx
import { FormProvider, useForm } from "react-hook-form";
import { Panel } from "primereact/panel";
import { Hospital } from "lucide-react";
import { TextInput } from "../../components/form/TextInput";
import { ImageInput } from "../../components/form/ImageInput";
import { ToggleSwitch } from "../../components/ToggleSwitch";
import { useTheme } from "../../context/ThemeContext";

export function GeneralSettings() {
  const methods = useForm();
  const { theme, setTheme, isDark } = useTheme();

  return (
    <FormProvider {...methods}>
      <Panel
        header={
          <div className="flex items-center gap-2">
            <div className="bg-green-100 p-2 rounded-lg">
              <Hospital className="text-green-600" size={18} />
            </div>
            <span className="font-semibold text-gray-800 dark:text-gray-200">
              General del Sistema
            </span>
          </div>
        }
        toggleable
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Nombre Institucional */}
          <div className="flex flex-col gap-2">
            <TextInput
              label="Nombre del Hospital/Clínica"
              name="hospitalName"
              placeholder="Hospital General San José"
            />
          </div>
          <div className="flex flex-col gap-2">
            <ImageInput
              name="profileImage"
              label="Logo Institucional"
              control={methods.control}
            />
          </div>
          <div className="flex flex-col gap-2">
            <div className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-800">
              <ToggleSwitch
                label="Tema del Sistema"
                enabled={isDark}
                onChange={(checked) => {
                  setTheme(checked ? "dark" : "light");
                }}
              />
              <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                {theme === "system"
                  ? "Usando tema del sistema"
                  : `Tema ${theme === "dark" ? "oscuro" : "claro"} activado`}
              </div>
            </div>
          </div>
        </div>
      </Panel>
    </FormProvider>
  );
}
