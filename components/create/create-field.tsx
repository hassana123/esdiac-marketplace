export function CreateField({
  children,
  label,
  hint,
}: {
  children: React.ReactNode;
  hint?: string;
  label: string;
}) {
  return (
    <label className="block space-y-2">
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm font-medium text-white/88">{label}</span>
        {hint ? <span className="text-xs text-white/38">{hint}</span> : null}
      </div>
      {children}
    </label>
  );
}
