const NAV_ITEMS = [
  { label: "Orders", active: true },
  { label: "Small Parcel" },
  { label: "Receipts" },
  { label: "Inventory" },
  { label: "Purchase Orders" },
  { label: "Reports" },
  { label: "Customers" },
  { label: "Items" },
  { label: "Warehouse" },
  { label: "Admin" },
];

export default function Sidebar() {
  return (
    <aside className="w-56 shrink-0 bg-white dark:bg-slate-800/50 border-r border-slate-200 dark:border-slate-700 flex flex-col">
      <div className="flex items-center gap-2 px-4 h-16 border-b border-slate-200 dark:border-slate-700">
        <div className="w-8 h-8 rounded-lg bg-brand-600 text-white grid place-items-center text-base">
          FP
        </div>
        <span className="font-medium text-slate-800 dark:text-slate-100">FulfillPlus</span>
      </div>

      <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
        {NAV_ITEMS.map((item) => (
          <a
            key={item.label}
            href="#"
            onClick={(e) => e.preventDefault()}
            className={
              "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition " +
              (item.active
                ? "bg-brand-50 dark:bg-brand-600/20 text-brand-700 dark:text-brand-400 font-medium"
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700/50")
            }
          >
            <span className="w-2 h-2 rounded-full bg-current opacity-60 shrink-0"></span>
            {item.label}
          </a>
        ))}
      </nav>

      <div className="p-4 text-xs text-slate-400 dark:text-slate-600 border-t border-slate-200 dark:border-slate-700">
        © 2026 FulfillPlus
      </div>
    </aside>
  );
}