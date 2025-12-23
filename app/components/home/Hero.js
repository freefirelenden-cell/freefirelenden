import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative text-center py-32 px-4 overflow-hidden shadow-xl bg-[var(--color-bg)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(250,204,21,0.08),transparent_70%)]" />

      <div className="relative z-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[var(--color-accent-yellow)] mb-6">
          Trusted Free Fire Accounts in Pakistan
        </h1>

        <p className="text-[var(--color-text-secondary)] max-w-xl mx-auto mb-8 text-sm md:text-base leading-relaxed">
          Buy ranked Free Fire accounts with secure Gmail transfer + seller verified service.
        </p>

        <Link
          href="/shop"
          className="inline-block bg-[var(--color-accent-yellow)] text-black font-semibold px-8 py-3 rounded-xl hover:bg-[var(--color-accent-gold)] hover:scale-105 transition-transform duration-200"
        >
          Browse Accounts
        </Link>

        <p className="text-xs text-[var(--color-accent-blue)] mt-4 italic">
          Trusted by thousands • Secure Deals • Seller Protection
        </p>
      </div>
    </section>
  );
}
