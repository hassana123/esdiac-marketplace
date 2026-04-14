import Link from "next/link";

type AuthShellProps = {
  title: string;
  subtitle: string;
  footerLabel: string;
  footerHref: string;
  footerLinkLabel: string;
  children: React.ReactNode;
};

export function AuthShell(props: AuthShellProps) {
  const { title, subtitle, footerLabel, footerHref, footerLinkLabel, children } =
    props;

  return (
    <section className="relative isolate min-h-screen overflow-hidden bg-background px-4 py-10 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(10,245,134,0.12),_transparent_30%),linear-gradient(180deg,_#0e1730,_#060b1d)]" />
      <div className="relative mx-auto justify-between items-center grid max-w-6xl gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
          <p className="text-xs font-semibold tracking-[0.45em] text-white/55">
            ESDIAC
          </p>
          <h1 className="mt-6 max-w-md text-4xl font-semibold text-white sm:text-5xl">
            {title}
          </h1>
          <p className="mt-4 max-w-lg text-base leading-8 text-brand-muted">
            {subtitle}
          </p>
        </div>
        <div className="rounded-[2rem] border border-white/10 bg-[#0c1430]/95 p-6 shadow-[0_30px_80px_rgba(2,8,24,0.55)] sm:p-8">
          {children}
          <p className="mt-6 text-center text-sm text-brand-muted">
            {footerLabel}{" "}
            <Link className="font-semibold text-brand-accent" href={footerHref}>
              {footerLinkLabel}
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
