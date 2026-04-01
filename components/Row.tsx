/**
 * A labelled key/value row used on the payment details card.
 */
export function Row({
  label,
  value,
  mono,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-xs text-gray-500 uppercase tracking-wide">{label}</span>
      <span className={`text-sm ${mono ? "font-mono break-all" : ""}`}>{value}</span>
    </div>
  );
}
