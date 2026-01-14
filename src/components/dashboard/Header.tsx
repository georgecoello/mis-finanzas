import { Bell, Search, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 animate-fade-in">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold font-display text-foreground">
          Buenos días, Alex 👋
        </h1>
        <p className="text-muted-foreground mt-1">
          Aquí está el resumen de tus finanzas
        </p>
      </div>
      <div className="flex items-center gap-3">
        <div className="relative hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input 
            type="text"
            placeholder="Buscar transacciones..."
            className="pl-10 pr-4 py-2 bg-card border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 w-64 transition-all"
          />
        </div>
        <Button variant="outline" size="icon" className="rounded-xl">
          <Bell className="h-4 w-4" />
        </Button>
        <Button className="rounded-xl gap-2">
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">Nueva Transacción</span>
        </Button>
      </div>
    </header>
  );
};

export default Header;