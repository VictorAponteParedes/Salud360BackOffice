import { Shield, Key, Timer, LockKeyhole } from "lucide-react";
import { Panel } from "primereact/panel";
import { InputNumber } from "primereact/inputnumber";
import { Checkbox } from "primereact/checkbox";

export function SecuritySettings() {
    return (
        <Panel
            header={
                <div className="flex items-center gap-2">
                    <div className="bg-gray-200 p-2 rounded-lg">
                        <Shield className="text-gray-700" size={18} />
                    </div>
                    <span className="font-semibold text-gray-800">Seguridad del Sistema</span>
                </div>
            }
            toggleable
        >
            <div className="flex flex-col gap-6">
                <div>
                    <h3 className="font-medium text-gray-700 mb-4">Configuración de seguridad y autenticación</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Tiempo de inactividad */}
                        <div className="flex flex-col gap-2">
                            <label htmlFor="inactivityTime" className="flex items-center gap-2 text-gray-700">
                                <Timer className="text-gray-500" size={16} />
                                Tiempo de inactividad (minutos)
                            </label>
                            <InputNumber
                                id="inactivityTime"
                                value={30}
                                min={1}
                                max={120}
                                mode="decimal"
                                showButtons
                                className="w-full"
                            />
                        </div>

                        {/* Longitud mínima de contraseña */}
                        <div className="flex flex-col gap-2">
                            <label htmlFor="minPassword" className="flex items-center gap-2 text-gray-700">
                                <Key className="text-gray-500" size={16} />
                                Longitud Mínima de Contraseña
                            </label>
                            <InputNumber
                                id="minPassword"
                                value={8}
                                min={6}
                                max={20}
                                mode="decimal"
                                showButtons
                                className="w-full"
                            />
                        </div>
                    </div>

                    {/* 2FA y Bloqueo */}
                    <div className="flex flex-col gap-4 mt-4">
                        <div className="flex items-center gap-3">
                            <Checkbox inputId="twoFactor" checked={true} />
                            <div className="flex items-center gap-2">
                                <LockKeyhole className="text-gray-500" size={16} />
                                <label htmlFor="twoFactor" className="font-medium">
                                    Autenticación de Dos Factores (2FA)
                                </label>
                            </div>
                            <span className="text-sm text-gray-500 ml-2">Seguridad adicional para usuarios</span>
                        </div>

                        <div className="flex items-center gap-3">
                            <Checkbox inputId="lockAccount" checked={true} />
                            <div className="flex items-center gap-2">
                                <LockKeyhole className="text-gray-500" size={16} />
                                <label htmlFor="lockAccount" className="font-medium">
                                    Bloqueo por Intentos Fallidos
                                </label>
                            </div>
                            <span className="text-sm text-gray-500 ml-2">Bloquear cuenta tras 5 intentos</span>
                        </div>
                    </div>
                </div>
            </div>
        </Panel>
    );
}