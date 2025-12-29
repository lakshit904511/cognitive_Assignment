const BASE_URL = "http://localhost:5000";

export async function createPaste(payload) {
  const res = await fetch(`${BASE_URL}/api/pastes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  if (!res.ok) throw data;
  return data;
}

export async function fetchPaste(id) {
  const res = await fetch(`${BASE_URL}/api/pastes/${id}`);
  const data = await res.json();
  if (!res.ok) throw data;
  return data;
}
