import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { useTransactions } from "@/context/TransactionContext";
import { useToast } from "@/hooks/use-toast";

const CATEGORIES = ["Alimentación", "Transporte", "Compras", "Hogar", "Café", "Salario", "Freelance", "Servicios", "Ahorro"];

export type ActionKind = "Enviar" | "Recibir" | "Transferir" | "Ahorrar";

interface Props {
  open: boolean;
  action: ActionKind | null;
  onOpenChange: (open: boolean) => void;
}

const ActionModal: React.FC<Props> = ({ open, action, onOpenChange }) => {
  const { addTransaction } = useTransactions();
  const { toast } = useToast();

  const [amount, setAmount] = React.useState<string>("");
  const [description, setDescription] = React.useState<string>("");
  const [category, setCategory] = React.useState<string>(CATEGORIES[0]);
  const [date, setDate] = React.useState<string>(() => new Date().toISOString().slice(0, 10));

  React.useEffect(() => {
    if (!open) {
      setAmount("");
      setDescription("");
      setCategory(CATEGORIES[0]);
      setDate(new Date().toISOString().slice(0, 10));
    } else {
      // Prefill description and category according to action
      if (action === "Enviar") {
        setDescription("Pago enviado");
        setCategory("Servicios");
      } else if (action === "Recibir") {
        setDescription("Ingreso recibido");
        setCategory("Freelance");
      } else if (action === "Transferir") {
        setDescription("Transferencia");
        setCategory("Hogar");
      } else if (action === "Ahorrar") {
        setDescription("Ahorro mensual");
        setCategory("Ahorro");
      }
    }
  }, [open, action]);

  if (!action) return null;

  const isIncome = action === "Recibir";

  function onSubmit(e?: React.FormEvent) {
    e?.preventDefault();
    const parsed = Number(amount);
    if (!amount || isNaN(parsed) || parsed <= 0) {
      toast({ title: "Cantidad inválida", description: "Introduce una cantidad mayor que 0", variant: "destructive" });
      return;
    }

    addTransaction({ description, amount: parsed, type: isIncome ? "income" : "expense", category, date: new Date(date).toISOString() });
    toast({ title: "Transacción creada", description: `${action}: ${description} - $${parsed.toFixed(2)}` });
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{action}</DialogTitle>
          <DialogDescription>Introduce la cantidad y detalles para la acción "{action}".</DialogDescription>
        </DialogHeader>

        <form onSubmit={(e) => onSubmit(e)} className="mt-4 space-y-3">
          <div className="space-y-1">
            <label className="text-sm font-medium">Cantidad</label>
            <input
              autoFocus
              className="w-full rounded-md border px-3 py-2"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              type="number"
              step="0.01"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium">Descripción</label>
            <input
              className="w-full rounded-md border px-3 py-2"
              placeholder="Descripción"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="flex gap-2">
            <div className="flex-1">
              <label className="text-sm font-medium">Categoría</label>
              <select className="w-full rounded-md border px-3 py-2" value={category} onChange={(e) => setCategory(e.target.value)}>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="w-40">
              <label className="text-sm font-medium">Fecha</label>
              <input type="date" className="w-full rounded-md border px-3 py-2" value={date} onChange={(e) => setDate(e.target.value)} />
            </div>
          </div>

          <DialogFooter className="flex justify-end gap-2">
            <button type="button" onClick={() => onOpenChange(false)} className="btn">Cancelar</button>
            <button type="submit" className="btn btn-primary">Confirmar</button>
          </DialogFooter>
        </form>

        <DialogClose />
      </DialogContent>
    </Dialog>
  );
};

export default ActionModal;