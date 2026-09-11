"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const links = [
  { href: "/#encuentro", label: "El Encuentro" },
  { href: "/programa", label: "Programa" },
  { href: "/conferencias", label: "Conferencias" },
  { href: "/hotel", label: "Hotel Sede" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 bg-white transition-shadow duration-300 ${
        scrolled ? "shadow-md" : "shadow-sm"
      }`}
    >
      <nav className="mx-auto max-w-6xl px-5 md:px-8 h-16 md:h-20 flex items-center justify-between">
        {/* Logo real: isotipo + wordmark */}
        <Link href="/" className="flex items-center gap-2.5">
          <Image src="/logo-isotipo.png" alt="América Unida" width={44} height={44}
                 className="h-9 w-auto md:h-11" priority />
          <span className="flex flex-col leading-none">
            <span className="font-heading font-extrabold tracking-wider text-navy text-sm md:text-base">
              AMÉRICA UNIDA
            </span>
            <span className="font-heading text-gold-dark text-[9px] md:text-[11px] tracking-[0.14em]">
              BAJA CALIFORNIA 2027
            </span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a key={l.href} href={l.href}
               className="text-navy/80 hover:text-navy text-sm font-medium transition-colors">
              {l.label}
            </a>
          ))}
          <Link href="/inscripciones"
                className="rounded-full bg-gold px-5 py-2 text-navy text-sm font-semibold hover:bg-gold-dark hover:text-white transition-colors">
            Inscríbete
          </Link>
        </div>

        <button onClick={() => setOpen((v) => !v)} className="md:hidden text-navy p-2"
                aria-label="Abrir menú" aria-expanded={open}>
          <div className="space-y-1.5">
            <span className={`block h-0.5 w-6 bg-navy transition-transform ${open ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`block h-0.5 w-6 bg-navy transition-opacity ${open ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 w-6 bg-navy transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`} />
          </div>
        </button>
      </nav>

      {open && (
        <div className="md:hidden fixed inset-0 top-16 bg-navy/98 backdrop-blur px-6 py-8 flex flex-col">
          <div className="flex flex-col gap-6">
            {links.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)}
                 className="text-white text-lg font-medium">
                {l.label}
              </a>
            ))}
          </div>
          <Link href="/inscripciones" onClick={() => setOpen(false)}
                className="mt-auto rounded-full bg-gold px-5 py-3 text-navy text-center font-semibold">
            Inscríbete
          </Link>
        </div>
      )}
    </header>
  );
}
