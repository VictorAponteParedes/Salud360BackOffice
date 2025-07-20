import { FileText } from "lucide-react";
import { Panel } from "primereact/panel";

export function LegalSettings() {
    return (
        <Panel
            header={
                <div className="flex items-center gap-2">
                    <div className="bg-red-100 p-2 rounded-lg">
                        <FileText className="text-red-600" size={18} />
                    </div>
                    <span className="font-semibold text-gray-800">Términos y Políticas</span>
                </div>
            }
            toggleable
        >
            <p className="text-gray-600">Aquí podrás editar los textos legales.</p>
        </Panel>
    );
}
