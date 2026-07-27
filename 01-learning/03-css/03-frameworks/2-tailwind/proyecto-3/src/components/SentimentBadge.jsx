const config = {
  positive: { label: "Positivo", color: "bg-positive/10 text-positive" },
  negative: { label: "Negativo", color: "bg-negative/10 text-negative" },
  neutral: { label: "Neutro", color: "bg-neutral/10 text-neutral" },
  mixed: { label: "Mixto", color: "bg-mixed/10 text-mixed" },
};

export default function SentimentBadge({ sentiment }) {
  const { label, color } = config[sentiment] || config.neutral;

  return (
    <span className={`inline-block rounded-full px-4 py-1.5 text-sm font-semibold ${color}`}>
      {label}
    </span>
  );
}
