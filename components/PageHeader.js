export default function PageHeader({ kicker, title, children }) {
  return (
    <section className="bg-navy text-white pt-28 md:pt-36 pb-12 md:pb-16">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        {kicker && <p className="kicker text-gold">{kicker}</p>}
        <h1 className="mt-3 font-heading text-4xl md:text-6xl font-extrabold">{title}</h1>
        {children && <div className="mt-4 text-white/70 max-w-2xl">{children}</div>}
      </div>
    </section>
  );
}
