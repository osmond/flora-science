import Link from "next/link";
import OnboardingModal from "@/components/UI/OnboardingModal";

export default function HomePage() {
  return (
    <>
      <OnboardingModal />
      <section className="flex flex-col items-center justify-center min-h-[60vh] gap-8 text-center">
        <h1 className="font-scientific text-4xl font-bold text-flora-leaf mb-2">Welcome to Flora-Science</h1>
        <p className="text-lg text-flora-soil max-w-xl">
          Your scientific plant care companion. Track, analyze, and optimize your plant wellness with data-driven insights and a calm, modern interface.
        </p>
        <nav aria-label="Main navigation" className="flex gap-6 mt-4">
          <Link href="/dashboard" className="px-6 py-3 rounded-lg bg-flora-leaf text-white font-semibold shadow-soft hover:bg-flora-accent transition-calm">Dashboard</Link>
          <Link href="/plants" className="px-6 py-3 rounded-lg bg-flora-leaf text-white font-semibold shadow-soft hover:bg-flora-accent transition-calm">Plants</Link>
          <Link href="/science/experiments" className="px-6 py-3 rounded-lg bg-flora-leaf text-white font-semibold shadow-soft hover:bg-flora-accent transition-calm">Science</Link>
        </nav>
        <span className="text-xs text-flora-soil mt-6">Accessible, data-first, and designed for scientific clarity.</span>
      </section>
    </>
  );
}
