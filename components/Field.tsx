/**
 * A labelled form field wrapper.
 * Keeps label + input visually consistent across the app.
 */
export function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm text-gray-400">{label}</label>
      {children}
    </div>
  );
}
