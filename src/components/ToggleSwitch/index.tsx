import { Button } from "primereact/button";

interface ToggleSwitchProps {
  enabled: boolean;
  onChange: (value: boolean) => void;
  label?: string;
}

export function ToggleSwitch({ enabled, onChange, label }: ToggleSwitchProps) {
  return (
    <div className="flex items-center justify-between">
      {label && <span className="text-gray-700 font-medium">{label}</span>}
      <Button
        type="button"
        role="switch"
        aria-checked={enabled}
        onClick={() => onChange(!enabled)}
        className={`!p-0 !border-0 !shadow-none w-11 h-6 flex items-center rounded-full transition-colors duration-300 ${
          enabled ? "bg-green-600" : "bg-gray-300"
        }`}
      >
        <div
          className={`w-4 h-4 bg-white rounded-full shadow transform transition-transform duration-300 ${
            enabled ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </Button>
    </div>
  );
}
