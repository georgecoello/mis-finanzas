# Welcome to your Mis Finanzas project


Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

---

## Funcionalidades añadidas (rápido)

- Gestión de transacciones en memoria y persistidas con `localStorage` (`src/context/TransactionContext.tsx`).
- Añadir transacciones desde el formulario en el sidebar (`AddTransactionForm`).
- Acciones rápidas que abren un modal interactivo para introducir cantidades y detalles (`QuickActions` + `ActionModal`).
- Los gráficos (`ExpenseChart`, `MonthlyChart`) y las tarjetas de estadísticas ahora consumen los datos reales del contexto.

Para probarlo:

1. Ejecuta `npm i` y `npm run dev`.
2. En la vista principal, usa el formulario a la derecha para añadir una transacción.
3. Usa "Acciones Rápidas" para generar transacciones de ejemplo.
4. Los gráficos y los totales se actualizan automáticamente.



