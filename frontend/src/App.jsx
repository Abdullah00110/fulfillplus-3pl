import { useState, useEffect } from "react";
import OrderForm from "./components/OrderForm";
import OrderTable from "./components/OrderTable";
import { getOrders, createOrder, updateOrder, deleteOrder } from "./api";

export default function App() {
  const [orders, setOrders] = useState([]);
  const [editing, setEditing] = useState(null);
  const [dark, setDark] = useState(
    () => localStorage.getItem("theme") === "dark"
  );
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // Load orders once on mount (READ)
  useEffect(() => {
    refresh();
  }, []);

  // Keep <html> class + storage in sync with dark state
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  async function refresh() {
    try {
      setLoading(true);
      setOrders(await getOrders());
      setError("");
    } catch (e) {
      setError("Could not reach the API. Is the Django server running on :8000?");
    } finally {
      setLoading(false);
    }
  }

  // CREATE or UPDATE depending on whether we're editing
  async function handleSave(data) {
    try {
      if (editing) {
        await updateOrder(editing.id, data);
        setEditing(null);
      } else {
        await createOrder(data);
      }
      await refresh();
    } catch (e) {
      setError(e.message);
    }
  }

  // DELETE
  async function handleDelete(order) {
    if (!confirm(`Delete order #${order.id}?`)) return;
    try {
      await deleteOrder(order.id);
      if (editing && editing.id === order.id) setEditing(null);
      await refresh();
    } catch (e) {
      setError(e.message);
    }
  }

  const total = orders.length;
  const pending = orders.filter((o) => o.status === "Pending").length;
  const shipped = orders.filter((o) => o.status === "Shipped").length;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 transition-colors">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">

        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-brand-100 dark:bg-brand-600/20 text-brand-600 dark:text-brand-500 grid place-items-center text-xl">
              📦
            </div>
            <div>
              <h1 className="text-lg font-medium leading-tight">Create order</h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">FulfillPlus · 3PL Manager</p>
            </div>
          </div>
          <button onClick={() => setDark((d) => !d)}
            className="h-9 px-3 rounded-md border border-slate-300 dark:border-slate-600 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition flex items-center gap-2">
            {dark ? "☀️ Light" : "🌙 Dark"}
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            ["Total orders", total],
            ["Pending", pending],
            ["Shipped", shipped],
          ].map(([label, val]) => (
            <div key={label} className="bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg p-4">
              <p className="text-xs text-slate-500 dark:text-slate-400">{label}</p>
              <p className="text-2xl font-medium mt-1">{val}</p>
            </div>
          ))}
        </div>

        {/* Error banner */}
        {error && (
          <div className="mb-4 px-4 py-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-sm">
            {error}
          </div>
        )}

        {/* Create / Edit form */}
        <OrderForm editing={editing} onSave={handleSave} onCancel={() => setEditing(null)} />

        {/* Orders table */}
        <div className="bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl p-5">
          <p className="text-base font-medium mb-2">Orders</p>
          {loading ? (
            <p className="text-center text-slate-400 py-10">Loading…</p>
          ) : (
            <OrderTable orders={orders} onEdit={setEditing} onDelete={handleDelete} />
          )}
        </div>

        <p className="text-center text-xs text-slate-400 dark:text-slate-600 mt-8">
          Django REST + React + PostgreSQL · FulfillPlus mini project
        </p>
      </div>
    </div>
  );
}
