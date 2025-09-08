const BASE = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

export async function fetchAnime(query = {}) {
  const params = new URLSearchParams(query).toString();
  const res = await fetch(`${BASE}/anime${params ? "?" + params : ""}`);
  return res.json();
}

export async function addAnime(data) {
  const res = await fetch(`${BASE}/anime`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return res.json();
}

export async function updateAnime(id, data) {
  const res = await fetch(`${BASE}/anime/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return res.json();
}

export async function removeAnime(id) {
  const res = await fetch(`${BASE}/anime/${id}`, { method: "DELETE" });
  return res.json();
}
