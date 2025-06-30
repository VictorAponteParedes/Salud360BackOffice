import { InformationCardStatusEnum } from "../enums";

export const InformationCardStatus = ({ isActive }: { isActive: boolean }) => {
    const status = isActive ? InformationCardStatusEnum.ACTIVO : InformationCardStatusEnum.INACTIVO;
    const statusClass = isActive
        ? "bg-green-100 text-green-800"
        : "bg-gray-100 text-gray-800";

    return (
        <span className={`text-xs px-2 py-1 rounded-full ${statusClass}`}>
            {status}
        </span>
    );
};