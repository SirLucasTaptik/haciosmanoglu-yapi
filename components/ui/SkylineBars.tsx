interface SkylineBarsProps {
  compact?: boolean;
  heights?: number[];
}

export function SkylineBars({ compact = false, heights }: SkylineBarsProps) {
  const bars = heights ?? (compact ? [0.4, 0.7, 1, 0.55] : [0.35, 0.6, 0.85, 1, 0.5]);

  return (
    <div className={clsxHeight(compact)} aria-hidden="true">
      {bars.map((h, i) => (
        <div
          key={i}
          className="skyline-bar w-1.5 rounded-sm"
          style={{
            height: "100%",
            // @ts-expect-error -- CSS custom property, not a standard style key
            "--bar-scale": h,
            background: i === bars.length - 1 ? "#C9A24B" : "rgba(201,162,75,0.45)",
            animationDelay: `${i * 80}ms`,
          }}
        />
      ))}
    </div>
  );
}

function clsxHeight(compact: boolean) {
  return `flex items-end gap-1 ${compact ? "h-8" : "h-14"}`;
}
