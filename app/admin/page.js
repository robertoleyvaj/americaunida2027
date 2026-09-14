"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import MiniTopbar from "@/components/MiniTopbar";
import { mxn } from "@/lib/pricing";
import { supabase } from "@/lib/supabase";
import { notificar } from "@/lib/notify";
import { precios } from "@/site.config";

export default function Admin() {
  const router = useRouter();
  const [estado, setEstado] = useState("cargando"); // cargando | denegado | ok
  const [items, setItems] = useState([]);
  const [busy, setBusy] = useState("");

  async function cargar() {
    // Pagos pendientes de revisión
    const { data: pagos } = await supabase
      .from("pagos").select("*").eq("estado", "en_revision").order("created_at", { ascending: true });
    const lista = pagos || [];
    // Datos del congresista
    const ids = [...new Set(lista.map((p) => p.user_id))];
    let inscMap = {};
    if (ids.length) {
      const { data: inscs } = await supabase.from("inscripciones").select("id,nombre,folio,gran_logia,email,total,valle").in("id", ids);
      (inscs || []).forEach((i) => { inscMap[i.id] = i; });
    }
    // Enlaces firmados a los comprobantes
    const conUrl = await Promise.all(lista.map(async (p) => {
      let url = null;
      if (p.comprobante_url) {
        const { data } = await supabase.storage.from("comprobantes").createSignedUrl(p.comprobante_url, 3600);
        url = data?.signedUrl || null;
      }
      return { ...p, insc: inscMap[p.user_id] || {}, url };
    }));
    setItems(conUrl);
  }

  useEffect(() => {
    (async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { router.replace("/ingresar"); return; }
      const { data: isAdmin } = await supabase.rpc("is_admin");
      if (!isAdmin) { setEstado("denegado"); return; }
      await cargar();
      setEstado("ok");
    })();
  }, [router]);

  const decidir = async (p, nuevo) => {
    setBusy(p.id);
    await supabase.from("pagos").update({ estado: nuevo }).eq("id", p.id);
    if (nuevo === "confirmado") {
      const { data: confirmados } = await supabase.from("pagos").select("monto").eq("user_id", p.user_id).eq("estado", "confirmado");
      const pagado = (confirmados || []).reduce((a, r) => a + r.monto, 0);
      const totalUser = (p.insc.total || 0) + (p.insc.valle ? precios.valleGuadalupe : 0);
      const restante = Math.max(0, totalUser - pagado);
      if (p.insc.email) notificar({ tipo: "pago_acreditado", nombre: p.insc.nombre, email: p.insc.email, monto: p.monto, restante });
    }
    await cargar();
    setBusy("");
  };

  const logout = async () => { await supabase.auth.signOut(); router.push("/"); };

  if (estado === "cargando") {
    return (
      <main className="min-h-screen bg-cloud">
        <MiniTopbar right={<span />} />
        <div className="mx-auto max-w-4xl px-5 py-20 text-center text-[#666]">Cargando…</div>
      </main>
    );
  }

  if (estado === "denegado") {
    return (
      <main className="min-h-screen bg-cloud">
        <MiniTopbar right={<button onClick={logout} className="hover:text-white">Cerrar sesión</button>} />
        <div className="mx-auto max-w-md px-5 py-20 text-center">
          <p className="text-navy font-heading font-bold text-lg">Acceso restringido</p>
          <p className="text-[#666] text-sm mt-2">Esta sección es solo para el equipo organizador.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-cloud">
      <MiniTopbar right={<button onClick={logout} className="hover:text-white">Cerrar sesión</button>} />

      <div className="mx-auto max-w-4xl px-5 md:px-8 py-8 md:py-12">
        <p className="kicker text-gold-dark">Administración</p>
        <h1 className="mt-1 font-heading text-navy text-2xl md:text-3xl font-bold">Comprobantes por revisar</h1>
        <p className="text-[#666] text-sm mt-1">Revisa cada comprobante y confírmalo o recházalo. Al confirmar, se suma al saldo del congresista.</p>

        <div className="mt-6 space-y-4">
          {items.length === 0 && (
            <div className="rounded-2xl bg-white border border-gray-100 p-8 text-center text-[#888]">
              No hay comprobantes pendientes. 🎉
            </div>
          )}

          {items.map((p) => (
            <div key={p.id} className="rounded-2xl bg-white border border-gray-100 p-5 flex flex-col md:flex-row md:items-center gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="font-heading font-bold text-navy">{p.insc.nombre || "—"}</p>
                  <span className="text-[11px] font-semibold bg-navy/5 text-navy rounded-full px-2 py-0.5">Folio {p.insc.folio || "—"}</span>
                </div>
                <p className="text-xs text-[#777] mt-0.5">{p.insc.gran_logia || ""} · {p.insc.email || ""}</p>
                <p className="text-sm text-[#555] mt-2">
                  Monto: <b className="text-navy font-heading">{mxn(p.monto)}</b>
                  {p.fecha && <> · Fecha: {p.fecha}</>}
                </p>
                {p.url ? (
                  <a href={p.url} target="_blank" rel="noopener noreferrer" className="inline-block mt-2 text-sm text-au-azul underline">Ver comprobante ↗</a>
                ) : (
                  <p className="mt-2 text-xs text-[#999]">Sin archivo de comprobante.</p>
                )}
              </div>
              <div className="flex gap-2">
                <button disabled={busy === p.id} onClick={() => decidir(p, "confirmado")}
                        className="rounded-full bg-au-verde px-5 py-2.5 text-white text-sm font-semibold hover:opacity-90 disabled:opacity-50">
                  Confirmar
                </button>
                <button disabled={busy === p.id} onClick={() => decidir(p, "rechazado")}
                        className="rounded-full border border-au-rojo text-au-rojo px-5 py-2.5 text-sm font-semibold hover:bg-au-rojo/10 disabled:opacity-50">
                  Rechazar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
