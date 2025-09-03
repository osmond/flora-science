import PlantDetailHero from "@/components/Plants/PlantDetailHero";
import QuickStats from "@/components/Plants/QuickStats";
import CareTimeline from "@/components/Plants/CareTimeline";
import NotesLog from "@/components/Plants/NotesLog";
import Gallery from "@/components/Plants/Gallery";
import CareCoach from "@/components/Plants/CareCoach";

export default function PlantDetailPage() {
  return (
    <main className="p-6 space-y-6">
      <PlantDetailHero />
      <QuickStats />
      <CareTimeline />
      <NotesLog />
      <Gallery />
      <CareCoach />
    </main>
  );
}
