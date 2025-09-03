import React from "react";

export default function ExperimentsPage() {
		return (
			<main className="max-w-3xl mx-auto py-12 px-4" aria-labelledby="experiments-title">
				<header className="mb-8">
					<h1 id="experiments-title" className="font-scientific text-3xl font-bold text-flora-sky mb-2">Experiments</h1>
					<p className="text-flora-soil text-base max-w-2xl">
						Track, analyze, and share your plant science experiments. Log observations, compare results, and contribute to the Flora-Science community’s understanding of plant care and growth.
					</p>
				</header>
				<section aria-label="Experiments List" className="rounded-xl border border-flora-sky bg-flora-light dark:bg-flora-darkBg p-8 shadow-soft flex flex-col items-center transition-calm">
					{/* Empty state with ARIA live region */}
					<div className="text-center py-12" aria-live="polite">
						<svg className="mx-auto mb-4 text-flora-sky animate-spin-slow" width="48" height="48" fill="none" viewBox="0 0 48 48" aria-hidden="true">
							<circle cx="24" cy="24" r="22" stroke="currentColor" strokeWidth="2" fill="none" />
							<path d="M24 14v12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
							<circle cx="24" cy="32" r="2" fill="currentColor" />
						</svg>
						<h2 className="font-scientific text-xl font-bold text-flora-sky mb-2">No experiments yet</h2>
						<p className="text-flora-soil mb-4">Start your first experiment to explore plant science and contribute new insights.</p>
						<button
							className="px-6 py-2 rounded-lg bg-flora-sky text-white font-bold shadow-soft hover:bg-flora-accent focus:outline-none focus:ring-2 focus:ring-flora-sky focus:ring-offset-2 transition-calm"
							aria-label="Add new experiment"
							tabIndex={0}
							onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); /* future: open modal */ } }}
						>
							Add Experiment
						</button>
					</div>
				</section>
				<style jsx>{`
					.animate-spin-slow {
						animation: spin 3s linear infinite;
					}
					@keyframes spin {
						0% { transform: rotate(0deg); }
						100% { transform: rotate(360deg); }
					}
				`}</style>
			</main>
		);
}
