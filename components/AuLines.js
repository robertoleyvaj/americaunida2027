// Líneas de color de América Unida: las jurisdicciones que se encuentran.
// Motivo gráfico recurrente del blueprint.
export default function AuLines({ className = "", animate = true }) {
  const colors = [
    "#3FA9F5", "#2453C6", "#2F9E6B", "#F2C230",
    "#E8842B", "#D23F3F", "#7C4DB8", "#8A5A2B",
  ];
  return (
    <div className={`au-lines space-y-1 ${className}`} aria-hidden="true">
      {colors.map((c, i) => (
        <span
          key={c}
          style={{
            backgroundColor: c,
            width: `${60 + ((i * 37) % 40)}%`,
            animationDelay: `${i * 90}ms`,
          }}
          className={animate ? "animate-slidein" : ""}
        />
      ))}
    </div>
  );
}
