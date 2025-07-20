import { Users } from "lucide-react";
import { Panel } from "primereact/panel";
import { Avatar } from "primereact/avatar";
import { Badge } from "primereact/badge";
import { Button } from "primereact/button";

export function UserRolesSettings() {
    const users = [
        { name: "Dr. Juan Pérez", role: "Administrador", avatar: "JP" },
        { name: "María González", role: "Recepcionista", avatar: "MG" },
        { name: "Ana Rodríguez", role: "Enfermería", avatar: "AR" }
    ];

    return (
        <Panel
            header={
                <div className="flex items-center gap-2">
                    <div className="bg-yellow-100 p-2 rounded-lg">
                        <Users className="text-yellow-600" size={18} />
                    </div>
                    <span className="font-semibold text-gray-800">Gestión de Usuarios y Roles</span>
                </div>
            }
            toggleable
        >
            <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium text-gray-700">Usuarios del Sistema</h3>
                    <Button
                        label="Agregar Usuario"
                        icon="pi pi-plus"
                        size="small"
                        className="text-sm"
                    />
                </div>

                {users.map((user, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                            <Avatar
                                label={user.avatar}
                                className="bg-blue-100 text-blue-600 font-medium"
                                size="large"
                                shape="circle"
                            />
                            <div>
                                <p className="font-medium">{user.name}</p>
                                <Badge
                                    value={user.role}
                                    severity="info"
                                    className="text-xs"
                                />
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <Button
                                icon="pi pi-pencil"
                                rounded
                                text
                                severity="secondary"
                                tooltip="Editar"
                                tooltipOptions={{ position: 'top' }}
                            />
                            <Button
                                icon="pi pi-trash"
                                rounded
                                text
                                severity="danger"
                                tooltip="Eliminar"
                                tooltipOptions={{ position: 'top' }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </Panel>
    );
}