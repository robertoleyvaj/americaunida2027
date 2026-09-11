"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import MiniTopbar from "@/components/MiniTopbar";
import DemoBanner from "@/components/DemoBanner";

export default function Ingresar() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    router.push("/panel");
  };

  return (
    <main className="min-h-screen bg-cloud">
      <DemoBanner />
      <MiniTopbar right={<Link href="/inscripciones" className="hover:text-white">Crear cuenta</Link>} />

      <div className="mx-auto max-w-md px-5 py-16">
        <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-7">
          <h1 className="font-heading text-navy text-2xl font-bold">Iniciar sesión</h1>
          <p className="text-sm text-[#666] mt-1">Entra a tu panel del congresista.</p>
          <form onSubmit={onSubmit} className="mt-6 space-y-3">
            <label className="block">
              <span className="text-xs font-medium text-[#555]">Correo electrónico</span>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
                     className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-gold focus:outline-none" />
            </label>
            <label className="block">
              <span className="text-xs font-medium text-[#555]">Contraseña</span>
              <input type="password" value={pass} onChange={(e) => setPass(e.target.value)} required
                     className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-gold focus:outline-none" />
            </label>
            <button type="submit"
                    className="w-full rounded-full bg-gold px-6 py-3 text-navy font-semibold hover:bg-gold-dark hover:text-white transition-colors mt-2">
              Entrar
            </button>
          </form>
          <p className="text-xs text-[#999] text-center mt-4">
            ¿No tienes cuenta? <Link href="/inscripciones" className="text-au-azul underline">Regístrate</Link>
          </p>
        </div>
      </div>
    </main>
  );
}
