import { Panel } from "primereact/panel";
import { Hospital } from "lucide-react";
import { InputText } from "primereact/inputtext";
import { ColorPicker } from "primereact/colorpicker";
import { Checkbox } from "primereact/checkbox";
import { FileUpload } from "primereact/fileupload";
import { TextInput } from "../../components/form/TextInput";

export function GeneralSettings() {
    return (
        <Panel
            header={
                <div className="flex items-center gap-2">
                    <div className="bg-green-100 p-2 rounded-lg">
                        <Hospital className="text-green-600" size={18} />
                    </div>
                    <span className="font-semibold text-gray-800">General del Sistema</span>
                </div>
            }
            toggleable
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Nombre Institucional */}
                <div className="flex flex-col gap-2">
                    <label htmlFor="hospitalName" className="font-medium text-gray-700">
                        Nombre del Hospital/Clínica
                    </label>
                    <InputText
                        id="hospitalName"
                        value="Hospital General San José"
                        onChange={(e) => console.log(e.target.value)}
                    />
                </div>

                {/* Logo Institucional */}
                <div className="flex flex-col gap-2">
                    <label className="font-medium text-gray-700">
                        Logo Institucional
                    </label>
                    <FileUpload
                        mode="basic"
                        name="logo"
                        url="/api/upload"
                        accept="image/*"
                        maxFileSize={1000000}
                        chooseLabel="Seleccionar archivo"
                        className="w-full"
                    />
                </div>

                {/* Color Primario */}
                <div className="flex flex-col gap-2">
                    <label htmlFor="primaryColor" className="font-medium text-gray-700">
                        Color Primario
                    </label>
                    <div className="flex items-center gap-3">
                        <ColorPicker
                            id="primaryColor"
                            format="hex"
                            value="#2553eb"
                            onChange={(e) => console.log(e.value)}
                        />
                        <span className="text-sm text-gray-500">#2553eb</span>
                    </div>
                </div>

                {/* Color Secundario */}
                <div className="flex flex-col gap-2">
                    <label htmlFor="secondaryColor" className="font-medium text-gray-700">
                        Color Secundario
                    </label>
                    <div className="flex items-center gap-3">
                        <ColorPicker
                            id="secondaryColor"
                            format="hex"
                            value="#059669"
                            onChange={(e) => console.log(e.value)}
                        />
                        <span className="text-sm text-gray-500">#059669</span>
                    </div>
                </div>

                {/* Tema del Sistema */}
                <div className="flex flex-col gap-2">
                    <label className="font-medium text-gray-700">
                        Tema del Sistema
                    </label>
                    <div className="flex items-center gap-3">
                        <Checkbox
                            inputId="lightTheme"
                            checked={true}
                            onChange={(e) => console.log(e.checked)}
                        />
                        <label htmlFor="lightTheme" className="text-gray-700">
                            Modo Claro Activado
                        </label>
                    </div>
                </div>
            </div>
        </Panel>
    );
}