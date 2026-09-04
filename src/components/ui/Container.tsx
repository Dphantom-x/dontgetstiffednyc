import { cn } from "@/lib/cn";

/** Shared measure: a narrow column on phones, a wide grid on desktop. */
export function Container({
  children,
  className,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <div
      id={id}
      className={cn("mx-auto w-full max-w-[470px] px-[22px] lg:max-w-[1240px] lg:px-12", className)}
    >
      {children}
    </div>
  );
}
