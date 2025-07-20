import { Bell, Mail, MessageSquare } from "lucide-react";
import { Panel } from "primereact/panel";
import { Checkbox } from "primereact/checkbox";
import { Editor } from "primereact/editor";

export function NotificationSettings() {
    const messageTemplates = [
        {
            title: "Confirmación de Cita",
            content: "Estimado/a (nombre), su cita ha sido confirmada para el (fecha) a las (hora)."
        },
        {
            title: "Recordatorio de Cita",
            content: "Recordatorio: Tiene una cita programada para el (fecha) a las (hora)."
        }
    ];

    return (
        <Panel
            header={
                <div className="flex items-center gap-2">
                    <div className="bg-indigo-100 p-2 rounded-lg">
                        <Bell className="text-indigo-600" size={18} />
                    </div>
                    <span className="font-semibold text-gray-800">Notificaciones y Mensajes</span>
                </div>
            }
            toggleable
            className="mt-4"
        >
            <div className="flex flex-col gap-6">
                <div>
                    <h3 className="font-medium text-gray-700 mb-3">Notificaciones Automáticas</h3>
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-3">
                            <Checkbox inputId="emails" checked={true} />
                            <div className="flex items-center gap-2">
                                <Mail className="text-gray-500" size={18} />
                                <label htmlFor="emails" className="font-medium">
                                    Correos Automáticos
                                </label>
                            </div>
                            <span className="text-sm text-gray-500 ml-2">Envío de confirmaciones y recordatorios</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Checkbox inputId="sms" checked={false} />
                            <div className="flex items-center gap-2">
                                <MessageSquare className="text-gray-500" size={18} />
                                <label htmlFor="sms" className="font-medium">
                                    Mensajes SMS
                                </label>
                            </div>
                            <span className="text-sm text-gray-500 ml-2">Notificaciones por mensaje de texto</span>
                        </div>
                    </div>
                </div>

                <div>
                    <h3 className="font-medium text-gray-700 mb-3">Plantillas de Mensajes</h3>
                    <div className="flex flex-col gap-4">
                        {messageTemplates.map((template, index) => (
                            <div key={index} className="border rounded-lg p-4">
                                <h4 className="font-medium mb-2">{template.title}</h4>
                                <Editor
                                    value={template.content}
                                    style={{ height: '120px' }}
                                    className="border-none"
                                />
                                <div className="flex justify-end mt-2">
                                    <button className="text-sm text-blue-600 hover:text-blue-800">
                                        Guardar Cambios
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Panel>
    );
}