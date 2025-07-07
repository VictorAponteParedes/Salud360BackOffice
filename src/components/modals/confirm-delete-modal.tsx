// src/components/modals/ConfirmDeleteModal.tsx
import React from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";

interface ConfirmDeleteModalProps {
  visible: boolean;
  onHide: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  loading?: boolean;
  confirmLabel?: string;
  cancelLabel?: string;
}

export const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({
  visible,
  onHide,
  onConfirm,
  title = "¿Estás seguro?",
  message = "Esta acción no se puede deshacer.",
  loading = false,
  confirmLabel = "Eliminar",
  cancelLabel = "Cancelar",
}) => {
  return (
    <Dialog
      header={title}
      visible={visible}
      onHide={onHide}
      style={{ width: "25rem" }}
      modal
      closable={false}
      footer={
        <div className="flex justify-end gap-2">
          <Button
            label={cancelLabel}
            icon="pi pi-times"
            className="p-button-text"
            onClick={onHide}
            disabled={loading}
          />
          <Button
            label={confirmLabel}
            icon="pi pi-trash"
            className="p-button-danger"
            onClick={onConfirm}
            loading={loading}
          />
        </div>
      }
    >
      <p className="m-0">{message}</p>
    </Dialog>
  );
};
