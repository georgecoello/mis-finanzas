import React from "react";

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: "income" | "expense";
  category: string;
  date: string; // ISO date string
}

type TransactionInput = Omit<Transaction, "id">;

type StatKey = "balance" | "ingresosMes" | "gastosMes" | "ahorroMeta";

interface StatsState {
  balance?: number;
  ingresosMes?: number;
  gastosMes?: number;
  ahorroMeta?: string; // e.g. "68%" or custom text
}

interface TransactionContextType {
  transactions: Transaction[];
  addTransaction: (input: TransactionInput) => void;
  removeTransaction: (id: string) => void;
  editTransaction: (id: string, patch: Partial<TransactionInput>) => void;
  clearTransactions: () => void;
  // UI / helpers
  searchTerm: string;
  setSearchTerm: (s: string) => void;
  stats: StatsState;
  setStat: (key: StatKey, value: number | string | undefined) => void;
}

const TransactionContext = React.createContext<TransactionContextType | undefined>(undefined);

const STORAGE_KEY = "mf_state_v1";

const SAMPLE: Transaction[] = [
  { id: "1", description: "Salario mensual", amount: 3500, type: "income", category: "Salario", date: new Date().toISOString() },
  { id: "2", description: "Supermercado", amount: 125.5, type: "expense", category: "Alimentación", date: new Date().toISOString() },
  { id: "3", description: "Gasolina", amount: 45.0, type: "expense", category: "Transporte", date: new Date().toISOString() },
];

type PersistedState = {
  transactions: Transaction[];
  stats?: StatsState;
  searchTerm?: string;
};

export const TransactionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [transactions, setTransactions] = React.useState<Transaction[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as PersistedState;
        return parsed.transactions ?? SAMPLE;
      }
    } catch (e) {
      // ignore
    }
    return SAMPLE;
  });

  const [stats, setStats] = React.useState<StatsState>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as PersistedState;
        return parsed.stats ?? {};
      }
    } catch (e) {}
    return {};
  });

  const [searchTerm, setSearchTerm] = React.useState<string>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as PersistedState;
        return parsed.searchTerm ?? "";
      }
    } catch (e) {}
    return "";
  });

  React.useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ transactions, stats, searchTerm }));
    } catch (e) {
      // ignore
    }
  }, [transactions, stats, searchTerm]);

  function addTransaction(input: TransactionInput) {
    const t: Transaction = { id: (crypto?.randomUUID && crypto.randomUUID()) || Date.now().toString(), ...input };
    setTransactions(prev => [t, ...prev]);
  }

  function removeTransaction(id: string) {
    setTransactions(prev => prev.filter(t => t.id !== id));
  }

  function editTransaction(id: string, patch: Partial<TransactionInput>) {
    setTransactions(prev => prev.map(t => t.id === id ? { ...t, ...patch } : t));
  }

  function clearTransactions() {
    setTransactions([]);
  }

  function setStat(key: StatKey, value: number | string | undefined) {
    setStats(prev => {
      const next = { ...prev } as any;
      if (value === undefined || value === null || value === "") {
        delete next[key];
      } else {
        if (key === "ahorroMeta") next[key] = String(value);
        else next[key] = Number(value);
      }
      return next;
    });
  }

  return (
    <TransactionContext.Provider value={{ transactions, addTransaction, removeTransaction, editTransaction, clearTransactions, searchTerm, setSearchTerm, stats, setStat }}>
      {children}
    </TransactionContext.Provider>
  );
};

export function useTransactions() {
  const ctx = React.useContext(TransactionContext);
  if (!ctx) throw new Error("useTransactions must be used within TransactionProvider");
  return ctx;
}

export default TransactionContext;
