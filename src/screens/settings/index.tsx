import { Settings as SettingsIcon } from "lucide-react";
import { GeneralSettings } from "./GeneralSettings";
import { MedicalParameters } from "./MedicalParametersSettings";
import { UserRolesSettings } from "./UserRolesSettings";
import { NotificationSettings } from "./NotificationSettings";
import { IntegrationsSettings } from "./IntegrationsSettings";
import { LegalSettings } from "./LegalSettings";
import { SecuritySettings } from "./SecuritySettings";
import { AdvancedSettings } from "./AdvancedSettings";

export default function Settings() {
    return (
        <div className="max-w-6xl mx-auto p-6 bg-white rounded-xl shadow space-y-6">
            {/* Encabezado fijo con ícono */}
            <div className="border-b pb-4 mb-4">
                <div className="flex items-center gap-3">
                    <div className="bg-blue-100 p-2 rounded-lg">
                        <SettingsIcon className="text-blue-600" size={24} />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">Configuración del Sistema</h1>
                        <p className="text-gray-600">Gestiona los parámetros de tu sistema médico</p>
                    </div>
                </div>
            </div>

            {/* Secciones de configuración */}
            <GeneralSettings />
            <MedicalParameters />
            <UserRolesSettings />
            <NotificationSettings />
            <IntegrationsSettings />
            <LegalSettings />
            <SecuritySettings />
            <AdvancedSettings />
        </div>
    );
}