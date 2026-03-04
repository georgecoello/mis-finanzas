import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  currentValue: string;
  onConfirm: (value: string) => void;
  placeholder?: string;
}

const StatEditModal: React.FC<Props> = ({ open, onOpenChange, title, currentValue, onConfirm, placeholder }) => {
  const [value, setValue] = React.useState(currentValue);

  React.useEffect(() => {
    setValue(currentValue);
  }, [currentValue, open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar {title}</DialogTitle>
          <DialogDescription>Introduce el nuevo valor para <strong>{title}</strong>.</DialogDescription>
        </DialogHeader>

        <div className="mt-4 space-y-3">
          <input
            className="w-full rounded-md border px-3 py-2"
            value={value}
            placeholder={placeholder}
            onChange={(e) => setValue(e.target.value)}
          />

          <DialogFooter className="flex justify-end gap-2">
            <button className="btn" onClick={() => onOpenChange(false)}>Cancelar</button>
            <button
              className="btn btn-primary"
              onClick={() => { onConfirm(value); onOpenChange(false); }}
            >Guardar</button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StatEditModal;
