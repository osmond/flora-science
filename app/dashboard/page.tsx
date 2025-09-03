import PlantOfTheDay from "@/components/Dashboard/PlantOfTheDay";
import QuickStats from "@/components/Dashboard/QuickStats";
import TaskList from "@/components/Dashboard/TaskList";
import SectionCard from "@/components/Dashboard/SectionCard";

export default function DashboardPage() {
  return (
    <main className="p-6 max-w-3xl mx-auto flex flex-col gap-8">
      <SectionCard title="Plant of the Day">
        <PlantOfTheDay />
      </SectionCard>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <SectionCard title="Quick Stats">
          <QuickStats />
        </SectionCard>
        <SectionCard title="Upcoming Tasks">
          <TaskList />
        </SectionCard>
      </div>
    </main>
  );
}
