import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import ActionModal, { ActionKind } from "@/components/dashboard/ActionModal";
import AddTransactionForm from "@/components/dashboard/AddTransactionForm";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const NewTransactionModal: React.FC<Props> = ({ open, onOpenChange }) => {
  const [subOpen, setSubOpen] = React.useState(false);
  const [action, setAction] = React.useState<ActionKind | null>(null);
  const [manualOpen, setManualOpen] = React.useState(false);

  function openAction(a: ActionKind) {
    setAction(a);
    setSubOpen(true);
  }

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nueva Transacción</DialogTitle>
            <DialogDescription>Elige qué tipo de transacción quieres crear.</DialogDescription>
          </DialogHeader>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <button className="btn" onClick={() => openAction("Enviar")}>Enviar</button>
            <button className="btn" onClick={() => openAction("Recibir")}>Recibir</button>
            <button className="btn" onClick={() => openAction("Transferir")}>Transferir</button>
            <button className="btn" onClick={() => openAction("Ahorrar")}>Ahorrar</button>
            <button className="btn btn-secondary col-span-2" onClick={() => { setManualOpen(true); }}>Crear manualmente</button>
          </div>

          <DialogFooter className="mt-4">
            <button className="btn" onClick={() => onOpenChange(false)}>Cerrar</button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <ActionModal open={subOpen} action={action} onOpenChange={(o) => setSubOpen(o)} />

      <Dialog open={manualOpen} onOpenChange={(o) => setManualOpen(o)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Crear transacción</DialogTitle>
            <DialogDescription>Introduce los datos de la transacción.</DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            <AddTransactionForm onAdded={() => setManualOpen(false)} />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default NewTransactionModal;