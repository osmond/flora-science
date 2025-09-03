import { useState } from "react";

export default function OnboardingModal() {
  const [open, setOpen] = useState(true);
  if (!open) return null;
  return (
    <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-flora-light dark:bg-flora-darkBg rounded-xl p-8 shadow-lg max-w-md w-full text-center">
        <h2 className="font-scientific text-2xl font-bold text-flora-leaf mb-4">Welcome to Flora-Science!</h2>
        <p className="text-flora-soil mb-6">Track, analyze, and optimize your plant care with scientific clarity. Explore the Dashboard, add plants, and log experiments to get started.</p>
        <button
          className="px-6 py-2 rounded-lg bg-flora-leaf text-white font-semibold shadow-soft hover:bg-flora-accent transition-calm"
          onClick={() => setOpen(false)}
          aria-label="Close onboarding"
        >
          Get Started
        </button>
      </div>
    </div>
  );
}
