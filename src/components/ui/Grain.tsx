/**
 * Halftone dot screen laid over the whole page, multiplied into the inks so
 * flat colour reads as newsprint rather than as a screen.
 */
export function Grain() {
  return (
    <div
      aria-hidden="true"
      className="print-grain pointer-events-none fixed inset-0 z-30 opacity-40 mix-blend-multiply"
    />
  );
}
