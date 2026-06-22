const STATUS_STYLES = {
  Pending: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
  Processing: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
  Shipped: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300",
};

export default function OrderTable({ orders, onEdit, onDelete }) {
  if (orders.length === 0) {
    return (
      <p className="text-center text-slate-400 dark:text-slate-500 py-10">
        No orders yet. Create one above.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700">
            <th className="py-3 px-2 font-medium">Order</th>
            <th className="py-3 px-2 font-medium">Customer</th>
            <th className="py-3 px-2 font-medium">Product</th>
            <th className="py-3 px-2 font-medium text-center">Qty</th>
            <th className="py-3 px-2 font-medium">Status</th>
            <th className="py-3 px-2 font-medium text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o.id}
                className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition">
              <td className="py-3 px-2 text-slate-400 dark:text-slate-500">#{o.id}</td>
              <td className="py-3 px-2 text-slate-800 dark:text-slate-100">{o.customer_name || "—"}</td>
              <td className="py-3 px-2 text-slate-600 dark:text-slate-300">{o.product}</td>
              <td className="py-3 px-2 text-center text-slate-600 dark:text-slate-300">{o.quantity}</td>
              <td className="py-3 px-2">
                <span className={`px-2.5 py-1 rounded-md text-xs font-medium ${STATUS_STYLES[o.status] || ""}`}>
                  {o.status}
                </span>
              </td>
              <td className="py-3 px-2 text-right whitespace-nowrap">
                <button onClick={() => onEdit(o)}
                  className="px-2.5 py-1 rounded-md text-xs text-brand-600 dark:text-brand-500 hover:bg-brand-50 dark:hover:bg-brand-600/10 transition">
                  Edit
                </button>
                <button onClick={() => onDelete(o)}
                  className="px-2.5 py-1 ml-1 rounded-md text-xs text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}