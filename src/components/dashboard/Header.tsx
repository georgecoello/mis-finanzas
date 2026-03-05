import React from "react";
import { useTransactions } from "@/context/TransactionContext";

const Header = () => {
  const { searchTerm, setSearchTerm } = useTransactions();

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

    </header>
  );
};

export default Header;