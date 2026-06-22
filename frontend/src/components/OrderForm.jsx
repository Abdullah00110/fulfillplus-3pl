import { useState, useEffect } from "react";

const EMPTY = { customer: "", warehouse: "", product: "", quantity: 1, reference_number: "", status: "Pending" };

export default function OrderForm({ editing, customers, warehouses, onSave, onCancel }) {
  const [form, setForm] = useState(EMPTY);

  useEffect(() => {
    setForm(editing ? { ...EMPTY, ...editing } : EMPTY);
  }, [editing]);

  function change(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: name === "quantity" ? Number(value) : value }));
  }

  function submit() {
    if (!form.customer || !form.product.trim()) {
      alert("Customer and product are required.");
      return;
    }
    onSave({ ...form, quantity: Math.max(1, form.quantity || 1) });
    setForm(EMPTY);
  }

  const input =
    "h-9 px-3 rounded-md border border-slate-300 bg-white text-slate-800 " +
    "focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 " +
    "dark:bg-slate-800 dark:border-slate-600 dark:text-slate-100";

  return (
    <div className="bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl p-5 mb-6">
      <p className="text-base font-medium mb-4 text-slate-800 dark:text-slate-100">
        {editing ? `Edit order #${editing.id}` : "New order"}
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        <div className="flex flex-col gap-1">
          <label className="text-xs text-slate-500 dark:text-slate-400">Customer *</label>
          <select className={input} name="customer" value={form.customer} onChange={change}>
            <option value="">Select customer…</option>
            {customers.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs text-slate-500 dark:text-slate-400">Warehouse</label>
          <select className={input} name="warehouse" value={form.warehouse} onChange={change}>
            <option value="">Select warehouse…</option>
            {warehouses.map((w) => (
              <option key={w.id} value={w.id}>{w.name}</option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs text-slate-500 dark:text-slate-400">Reference number</label>
          <input className={input} name="reference_number" value={form.reference_number} onChange={change} placeholder="Optional" />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs text-slate-500 dark:text-slate-400">Product</label>
          <input className={input} name="product" value={form.product} onChange={change} placeholder="e.g. Wireless mouse" />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs text-slate-500 dark:text-slate-400">Quantity</label>
          <input className={input} type="number" min="1" name="quantity" value={form.quantity} onChange={change} />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs text-slate-500 dark:text-slate-400">Status</label>
          <select className={input} name="status" value={form.status} onChange={change}>
            <option>Pending</option>
            <option>Processing</option>
            <option>Shipped</option>
          </select>
        </div>
      </div>

      <div className="flex gap-3 mt-4">
        <button onClick={submit}
          className="h-9 px-5 rounded-md bg-brand-600 hover:bg-brand-700 text-white text-sm font-medium transition">
          {editing ? "Update order" : "+ Create order"}
        </button>
        {editing && (
          <button onClick={onCancel}
            className="h-9 px-4 rounded-md border border-slate-300 dark:border-slate-600 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition">
            Cancel
          </button>
        )}
      </div>
    </div>
  );
}