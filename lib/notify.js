// Dispara un aviso por correo sin bloquear la navegación (best-effort).
export function notificar(payload) {
  try {
    fetch("/api/notificar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      keepalive: true,
    }).catch(() => {});
  } catch (_) {}
}
