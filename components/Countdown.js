"use client";

import { useEffect, useState } from "react";
import { site } from "@/site.config";

function diff(target) {
  const ms = Math.max(0, target - Date.now());
  const d = Math.floor(ms / 86400000);
  const h = Math.floor((ms % 86400000) / 3600000);
  const m = Math.floor((ms % 3600000) / 60000);
  const s = Math.floor((ms % 60000) / 1000);
  return { d, h, m, s };
}

export default function Countdown() {
  const target = new Date(site.fechaInicio).getTime();
  // Empieza en null para evitar diferencias entre servidor y navegador
  const [time, setTime] = useState(null);

  useEffect(() => {
    setTime(diff(target));
    const id = setInterval(() => setTime(diff(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  const items = [
    { v: time?.d, l: "Días" },
    { v: time?.h, l: "Horas" },
    { v: time?.m, l: "Min" },
    { v: time?.s, l: "Seg" },
  ];

  return (
    <div className="flex gap-3 md:gap-5">
      {items.map((it) => (
        <div
          key={it.l}
          className="min-w-[62px] md:min-w-[80px] rounded-xl border border-white/15 bg-white/5 px-2 py-3 text-center"
        >
          <div className="font-heading text-2xl md:text-4xl font-bold text-gold tabular-nums">
            {time === null ? "--" : String(it.v).padStart(2, "0")}
          </div>
          <div className="text-[10px] md:text-xs uppercase tracking-widest text-white/60 mt-1">
            {it.l}
          </div>
        </div>
      ))}
    </div>
  );
}
