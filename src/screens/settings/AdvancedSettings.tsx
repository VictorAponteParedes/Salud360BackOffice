import { Shield, Key, Database, Power, ScrollText } from "lucide-react";
import { Panel } from "primereact/panel";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { InputTextarea } from "primereact/inputtextarea";


export function AdvancedSettings() {
    return (
        <Panel
            header={
                <div className="flex items-center gap-2">
                    <div className="bg-black p-2 rounded-lg">
                        <Shield className="text-white" size={18} />
                    </div>
                    <span className="font-semibold text-gray-800">Zona Avanzada / Mantenimiento</span>
                </div>
            }
            toggleable
            className="mt-4"
        >
            <div className="flex flex-col gap-4">
                <div className="bg-red-50 border-l-4 border-red-500 p-3 text-red-700">
                    <p className="font-medium">Advertencia: Las siguientes acciones pueden afectar el funcionamiento del sistema</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Button
                        severity="secondary"
                        className="flex flex-col items-center justify-center h-32 gap-2"
                        onClick={() => console.log("Export DB")}
                    >
                        <Database size={24} className="text-gray-600" />
                        <span>Exportar Base de Datos</span>
                    </Button>

                    <Button
                        severity="danger"
                        className="flex flex-col items-center justify-center h-32 gap-2"
                        onClick={() => console.log("Restart System")}
                    >
                        <Power size={24} className="text-white" />
                        <span>Reiniciar Sistema</span>
                    </Button>

                    <Button
                        severity="info"
                        className="flex flex-col items-center justify-center h-32 gap-2"
                        onClick={() => console.log("View Logs")}
                    >
                        <ScrollText size={24} className="text-white" />
                        <span>Ver Logs</span>
                    </Button>
                </div>

                <Divider />

                <div className="flex flex-col gap-2">
                    <label htmlFor="systemMessage" className="font-medium text-gray-700">
                        Mensaje de Recordatorio Global
                    </label>
                    <InputTextarea
                        id="systemMessage"
                        value="Recordatorio: Tiene una cita programada para mañana (fecha) a las (hora)..."
                        rows={3}
                        className="w-full"
                    />
                    <div className="flex justify-end">
                        <Button label="Actualizar Mensaje" size="small" />
                    </div>
                </div>
            </div>
        </Panel>
    );
}
