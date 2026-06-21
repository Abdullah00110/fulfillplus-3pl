import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
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

  useEffect(() => {
    refresh();
  }, []);

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
    <div className="flex h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 transition-colors">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <Header dark={dark} onToggleTheme={() => setDark((d) => !d)} />

        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <h1 className="text-xl font-medium">Create order</h1>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Add and manage fulfillment orders
              </p>
            </div>

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

            {error && (
              <div className="mb-4 px-4 py-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-sm">
                {error}
              </div>
            )}

            <OrderForm editing={editing} onSave={handleSave} onCancel={() => setEditing(null)} />

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
        </main>
      </div>
    </div>
  );
}