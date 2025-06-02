import React from "react";
import { useFormContext } from "react-hook-form";

type ScheduleInputRowProps = {
  index: number;
  remove: (index: number) => void;
};

const daysOfWeek = [
  { label: "Lunes", value: "MONDAY" },
  { label: "Martes", value: "TUESDAY" },
  { label: "Miércoles", value: "WEDNESDAY" },
  { label: "Jueves", value: "THURSDAY" },
  { label: "Viernes", value: "FRIDAY" },
  { label: "Sábado", value: "SATURDAY" },
  { label: "Domingo", value: "SUNDAY" },
];

export const ScheduleInputRow = ({ index, remove }: ScheduleInputRowProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="flex gap-4 items-center mb-2">
      <select
        {...register(`scheduleDtos.${index}.day`, {
          required: "El día es requerido",
        })}
        className="p-2 border rounded"
      >
        <option value="">Selecciona el día</option>
        {daysOfWeek.map((day) => (
          <option key={day.value} value={day.value}>
            {day.label}
          </option>
        ))}
      </select>

      <input
        type="time"
        {...register(`scheduleDtos.${index}.startTime`, {
          required: "La hora de inicio es requerida",
        })}
        className="p-2 border rounded"
      />

      <input
        type="time"
        {...register(`scheduleDtos.${index}.endTime`, {
          required: "La hora de fin es requerida",
        })}
        className="p-2 border rounded"
      />

      <button
        type="button"
        onClick={() => remove(index)}
        className="text-red-500 font-bold px-2"
      >
        ×
      </button>
    </div>
  );
};