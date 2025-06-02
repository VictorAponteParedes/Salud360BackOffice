import React from "react";
import { useFormContext } from "react-hook-form";

type ScheduleInputRowProps = {
  index: number;
  remove: (index: number) => void;
};

const daysOfWeek = [
  "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo",
];

export const ScheduleInputRow = ({ index, remove }: ScheduleInputRowProps) => {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="flex gap-4 items-center mb-2">
      <select
        {...register(`schedule.${index}.day` as const, { required: "Day is required" })}
        className="p-2 border rounded"
      >
        <option value="">Selecciona el dia</option>
        {daysOfWeek.map((day) => (
          <option key={day} value={day}>{day}</option>
        ))}
      </select>

      <input
        type="time"
        {...register(`schedule.${index}.startTime` as const, { required: "Start time required" })}
        className="p-2 border rounded"
      />

      <input
        type="time"
        {...register(`schedule.${index}.endTime` as const, { required: "End time required" })}
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
