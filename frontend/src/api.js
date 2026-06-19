// All calls to the Django REST API live here.
// Change this if your backend runs on a different port.
const BASE_URL = "http://127.0.0.1:8000/api/orders/";

// READ — get all orders
export async function getOrders() {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error("Failed to load orders");
  const data = await res.json();
  // DRF pagination returns { results: [...] }
  return data.results ?? data;
}

// CREATE — add a new order
export async function createOrder(order) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(order),
  });
  if (!res.ok) throw new Error("Failed to create order");
  return res.json();
}

// UPDATE — edit an existing order
export async function updateOrder(id, order) {
  const res = await fetch(`${BASE_URL}${id}/`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(order),
  });
  if (!res.ok) throw new Error("Failed to update order");
  return res.json();
}

// DELETE — remove an order
export async function deleteOrder(id) {
  const res = await fetch(`${BASE_URL}${id}/`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete order");
  return true;
}
