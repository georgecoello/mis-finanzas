import React from "react";
import { useTransactions } from "@/context/TransactionContext";
import { useToast } from "@/hooks/use-toast";
import { formatCurrency } from "@/lib/utils";

const CATEGORIES = ["Alimentación", "Transporte", "Compras", "Hogar", "Café", "Salario", "Freelance", "Farmacia", "Rancho", "Recargas", "Tarjeta"];

const AddTransactionForm: React.FC<{ onAdded?: () => void }> = ({ onAdded }) => {
  const { addTransaction } = useTransactions();
  const { toast } = useToast();

  const [description, setDescription] = React.useState("");
  const [amount, setAmount] = React.useState("");
  const [type, setType] = React.useState<"income" | "expense">("expense");
  const [category, setCategory] = React.useState(CATEGORIES[0]);
  const [date, setDate] = React.useState(() => new Date().toISOString().slice(0, 10));

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = Number(amount);
    if (!description || isNaN(parsed) || parsed <= 0) {
      toast({ title: "Datos inválidos", description: "Introduce descripción y cantidad válida", variant: "destructive" });
      return;
    }

    addTransaction({ description, amount: parsed, type, category, date: new Date(date).toISOString() });

    toast({ title: "Transacción añadida", description: `${description} - ${formatCurrency(parsed)}` });

    setDescription("");
    setAmount("");
    setType("expense");
    setCategory(CATEGORIES[0]);
    setDate(new Date().toISOString().slice(0, 10));

    onAdded?.();
  }

  return (
    <div className="glass-card p-6 animate-fade-in">
      <h3 className="text-lg font-semibold mb-3">Añadir Transacción</h3>
      <form onSubmit={onSubmit} className="space-y-3">
        <input
          className="w-full rounded-md border px-3 py-2"
          placeholder="Descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          className="w-full rounded-md border px-3 py-2"
          placeholder="Cantidad"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          type="number"
          step="0.01"
        />

        <div className="flex gap-2">
          <select className="flex-1 rounded-md border px-3 py-2" value={type} onChange={(e) => setType(e.target.value as any)}>
            <option value="expense">Gasto</option>
            <option value="income">Ingreso</option>
          </select>
          <select className="flex-1 rounded-md border px-3 py-2" value={category} onChange={(e) => setCategory(e.target.value)}>
            {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
        </div>

        <input type="date" className="w-full rounded-md border px-3 py-2" value={date} onChange={(e) => setDate(e.target.value)} />

        <div className="flex justify-end">
          <button type="submit" className="btn btn-primary">Añadir</button>
        </div>
      </form>
    </div>
  );
};

export default AddTransactionForm;
