import { Panel } from "primereact/panel";
import { ClipboardList, Clock } from "lucide-react";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { Checkbox } from "primereact/checkbox";
import { SelectInput } from "../../components/form/SelectInput";
import { useSpecialty } from "../../hooks/useSpecialty";
import type { SpecialtiesType } from "../../types/specialties";

export function MedicalParameters() {
  const { specialties } = useSpecialty();

  const specialtyOptions = specialties
    .filter((specialty: SpecialtiesType) => !!specialty.id)
    .map((specialty: SpecialtiesType) => ({
      label: specialty.name,
      value: specialty.id,
    }));

  return (
    <Panel
      header={
        <div className="flex items-center gap-2">
          <div className="bg-blue-100 p-2 rounded-lg">
            <ClipboardList className="text-blue-600" size={18} />
          </div>
          <span className="font-semibold text-gray-800">
            Parámetros Médicos
          </span>
        </div>
      }
      toggleable
      className="mt-4"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Especialidades Médicas */}
        <div className="md:col-span-2 flex flex-col gap-2">
          <SelectInput
            name="specialties"
            label="Especialidades Médicas"
            options={specialtyOptions}
          />
        </div>

        {/* Tiempo Máximo entre Citas */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="maxAppointmentTime"
            className="font-medium text-gray-700"
          >
            Tiempo Máximo entre Citas (minutos)
          </label>
          <InputNumber
            id="maxAppointmentTime"
            value={30}
            mode="decimal"
            min={10}
            max={120}
            onChange={(e) => console.log(e.value)}
            className="w-full"
          />
        </div>

        {/* Horario de Atención */}
        <div className="flex flex-col gap-2">
          <label className="font-medium text-gray-700">
            Horario de Atención
          </label>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Clock className="text-gray-500" size={16} />
              <InputText
                type="time"
                value="08:00"
                onChange={(e) => console.log(e.target.value)}
              />
            </div>
            <span className="text-gray-500">a</span>
            <div className="flex items-center gap-2">
              <Clock className="text-gray-500" size={16} />
              <InputText
                type="time"
                value="18:00"
                onChange={(e) => console.log(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Reserva Online */}
        <div className="md:col-span-2 flex flex-col gap-2 pt-2">
          <div className="flex items-center gap-3">
            <Checkbox
              inputId="onlineBooking"
              checked={true}
              onChange={(e) => console.log(e.checked)}
            />
            <label
              htmlFor="onlineBooking"
              className="font-medium text-gray-700"
            >
              Permitir reservas desde la web
            </label>
          </div>
        </div>
      </div>
    </Panel>
  );
}