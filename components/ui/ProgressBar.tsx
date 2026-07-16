export function ProgressBar({ value }: { value: number }) {
  return (
    <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-black/8">
      <div className="h-full rounded-full bg-gold" style={{ width: `${value}%` }} />
    </div>
  );
}
