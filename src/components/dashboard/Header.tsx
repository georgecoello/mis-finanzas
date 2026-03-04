import React from "react";
import { Bell, Search, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTransactions } from "@/context/TransactionContext";
import NewTransactionModal from "@/components/dashboard/NewTransactionModal";

const Header = () => {
  const { searchTerm, setSearchTerm } = useTransactions();
  const [open, setOpen] = React.useState(false);

  return (
    <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 animate-fade-in">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold font-display text-foreground">
          Bienvenido, Jorge
        </h1>
        <p className="text-muted-foreground mt-1">
          Aquí está el resumen de tus finanzas
        </p>
      </div>
      <div className="flex items-center gap-3">
        <Button className="rounded-xl gap-2" onClick={() => setOpen(true)}>
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">Nueva Transacción</span>
        </Button>
      </div>

      <NewTransactionModal open={open} onOpenChange={(v) => setOpen(v)} />
    </header>
  );
};

export default Header;