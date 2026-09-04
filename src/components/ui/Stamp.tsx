import { cn } from "@/lib/cn";

/**
 * Rubber-stamp block: a double pink rule around monospaced caps, usually set
 * on a slight angle. Used for the licence marks and the pre-launch stamp.
 */
export function Stamp({
  children,
  className,
  innerClassName,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
  style?: React.CSSProperties;
}) {
  return (
    // Display and background are left to the caller: baking them in here would
    // fight any `hidden` / `lg:inline-block` / transparent variant passed in.
    <div className={cn("border-2 border-pink p-1", className)} style={style}>
      <div
        className={cn(
          "border border-pink px-2 py-1 text-center font-mono text-[9px] leading-[1.25] font-bold tracking-[0.14em] text-pink uppercase",
          innerClassName,
        )}
      >
        {children}
      </div>
    </div>
  );
}
