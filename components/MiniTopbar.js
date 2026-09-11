import Link from "next/link";
import Image from "next/image";

export default function MiniTopbar({ right }) {
  return (
    <header className="bg-navy text-white">
      <div className="mx-auto max-w-5xl px-5 md:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <Image src="/logo-isotipo.png" alt="América Unida" width={40} height={40} className="h-9 w-auto" />
          <span className="flex flex-col leading-none">
            <span className="font-heading font-extrabold tracking-wider text-white text-sm">AMÉRICA UNIDA</span>
            <span className="font-heading text-gold text-[9px] tracking-[0.12em]">BAJA CALIFORNIA 2027</span>
          </span>
        </Link>
        <div className="text-sm text-white/80">{right}</div>
      </div>
    </header>
  );
}
