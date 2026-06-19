import { useState, useEffect } from "react";

const EMPTY = { customer_name: "", product: "", quantity: 1, status: "Pending" };

export default function OrderForm({ editing, onSave, onCancel }) {
  const [form, setForm] = useState(EMPTY);

  // When an order is picked for editing, fill the form with its values
  useEffect(() => {
    setForm(editing ? { ...editing } : EMPTY);
  }, [editing]);

  function change(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: name === "quantity" ? Number(value) : value }));
  }

  function submit() {
    if (!form.customer_name.trim() || !form.product.trim()) {
      alert("Customer name and product are required.");
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

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="flex flex-col gap-1">
          <label className="text-xs text-slate-500 dark:text-slate-400">Customer name</label>
          <input className={input} name="customer_name" value={form.customer_name}
                 onChange={change} placeholder="e.g. Abdullah Sunasra" />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs text-slate-500 dark:text-slate-400">Product</label>
          <input className={input} name="product" value={form.product}
                 onChange={change} placeholder="e.g. Wireless mouse" />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs text-slate-500 dark:text-slate-400">Quantity</label>
          <input className={input} type="number" min="1" name="quantity"
                 value={form.quantity} onChange={change} />
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
