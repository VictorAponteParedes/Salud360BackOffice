import React, { useRef } from "react";
import { useController, type Control } from "react-hook-form";

interface ImageInputProps {
  name: string;
  label: string;
  control: Control<any>;
}

export const ImageInput: React.FC<ImageInputProps> = ({ name, label, control }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    field: { onChange, value },
  } = useController({
    name,
    control,
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      onChange(imageUrl);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <div
        onClick={() => fileInputRef.current?.click()}
        className="cursor-pointer border border-dashed border-gray-400 rounded-md p-4 flex flex-col items-center justify-center hover:bg-gray-50 transition"
      >
        {value ? (
          <img
            src={value}
            alt="Preview"
            className="w-32 h-32 object-cover rounded-full"
          />
        ) : (
          <span className="text-gray-500 text-sm">Haz clic para subir una imagen</span>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />
      </div>
    </div>
  );
};
