import { Server } from "lucide-react";
import { Panel } from "primereact/panel";

export function IntegrationsSettings() {
    return (
        <Panel
            header={
                <div className="flex items-center gap-2">
                    <div className="bg-purple-100 p-2 rounded-lg">
                        <Server className="text-purple-600" size={18} />
                    </div>
                    <span className="font-semibold text-gray-800">Integraciones Externas</span>
                </div>
            }
            toggleable
        >
            <p className="text-gray-600">Aquí se gestionarán API Keys y otros servicios externos.</p>
        </Panel>
    );
}