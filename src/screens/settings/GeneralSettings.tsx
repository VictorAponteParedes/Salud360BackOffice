import { FormProvider, useForm } from "react-hook-form";
import { Panel } from "primereact/panel";
import { Hospital } from "lucide-react";
import { TextInput } from "../../components/form/TextInput";
import { ImageInput } from "../../components/form/ImageInput";
import { ToggleSwitch } from "../../components/ToggleSwitch";
import { useState } from "react";

export function GeneralSettings() {
  const methods = useForm();
  const [isLightTheme, setIsLightTheme] = useState<boolean>(false);
  return (
    <FormProvider {...methods}>
      <Panel
        header={
          <div className="flex items-center gap-2">
            <div className="bg-green-100 p-2 rounded-lg">
              <Hospital className="text-green-600" size={18} />
            </div>
            <span className="font-semibold text-gray-800">
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
            <div className="border rounded-lg p-4 bg-gray-50">
              <ToggleSwitch
                label="Tema del Sistema"
                enabled={isLightTheme}
                onChange={(checked) => {
                  setIsLightTheme(checked);
                  console.log("Modo claro activado:", checked);
                }}
              />
            </div>
          </div>
        </div>
      </Panel>
    </FormProvider>
  );
}
