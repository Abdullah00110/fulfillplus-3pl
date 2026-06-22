const API = "http://127.0.0.1:8000/api/";
const ORDERS = API + "orders/";

export async function getOrders() {
  const res = await fetch(ORDERS);
  if (!res.ok) throw new Error("Failed to load orders");
  const data = await res.json();
  return data.results ?? data;
}

export async function createOrder(order) {
  const res = await fetch(ORDERS, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(order),
  });
  if (!res.ok) throw new Error("Failed to create order");
  return res.json();
}

export async function updateOrder(id, order) {
  const res = await fetch(`${ORDERS}${id}/`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(order),
  });
  if (!res.ok) throw new Error("Failed to update order");
  return res.json();
}

export async function deleteOrder(id) {
  const res = await fetch(`${ORDERS}${id}/`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete order");
  return true;
}

export async function getCustomers() {
  const res = await fetch(API + "customers/");
  if (!res.ok) throw new Error("Failed to load customers");
  const data = await res.json();
  return data.results ?? data;
}

export async function getWarehouses() {
  const res = await fetch(API + "warehouses/");
  if (!res.ok) throw new Error("Failed to load warehouses");
  const data = await res.json();
  return data.results ?? data;
}