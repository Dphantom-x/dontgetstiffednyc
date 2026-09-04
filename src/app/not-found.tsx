import type { Metadata } from "next";
import Link from "next/link";
import { Stamp } from "@/components/ui/Stamp";
import { masthead } from "@/content/site";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col justify-center bg-cream px-6 py-16 text-navy">
      <div className="mx-auto w-full max-w-[620px]">
        <Stamp
          className="mb-8 inline-block bg-cream"
          innerClassName="px-3 py-2 text-[11px] tracking-[0.18em]"
          style={{ transform: "rotate(-3deg)" }}
        >
          404 · missing page
        </Stamp>

        <h1 className="headline text-[clamp(48px,11vw,88px)] leading-[0.84] [text-shadow:5px_5px_0_var(--color-pink)]">
          Nothing
          <br />
          here
        </h1>

        <p className="mt-6 max-w-[440px] text-[17px] leading-[1.4] font-semibold text-pretty">
          This one got lost in the post. The templates, your rights and the panic buttons are all
          still on the front page.
        </p>

        <Link
          href="/"
          style={{ transform: "rotate(-0.8deg)" }}
          className="headline mt-8 inline-flex min-h-[60px] items-center px-6 py-4 text-[19px] tracking-[-0.01em] text-navy shadow-[5px_5px_0_var(--color-navy)]"
        >
          <span className="bg-pink -mx-6 -my-4 px-6 py-4">Back to {masthead.domain} →</span>
        </Link>
      </div>
    </main>
  );
}
