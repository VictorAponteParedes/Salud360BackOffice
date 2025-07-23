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
        unstyled
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          enabled ? "bg-blue-500" : "bg-gray-300"
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-lg transition-transform ${
            enabled ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </Button>
    </div>
  );
}
