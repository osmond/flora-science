'use client'

import { useMemo } from 'react'
import {
  parse,
  isSameDay,
  isAfter,
  formatDistanceToNow,
} from 'date-fns'
import { Droplet, Sprout, FileText } from 'lucide-react'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PlantCard from '@/components/PlantCard'
import { samplePlants } from '@/lib/plants'
import usePlantMetrics from '@/hooks/usePlantMetrics'

export default function TasksPage() {
  const plants = useMemo(() => Object.entries(samplePlants), [])
  const today = useMemo(() => new Date(), [])

  const dueToday = useMemo(() => {
    return plants.filter(([, p]) => {
      const dueDate = parse(`${p.nextDue} ${today.getFullYear()}`, 'MMM d yyyy', today)
      const status = p.status.toLowerCase()
      return (
        status.includes('overdue') ||
        status.includes('due') ||
        isSameDay(dueDate, today)
      )
    })
  }, [plants, today])

  const upcoming = useMemo(() => {
    return plants.filter(([, p]) => {
      const dueDate = parse(`${p.nextDue} ${today.getFullYear()}`, 'MMM d yyyy', today)
      const status = p.status.toLowerCase()
      return !status.includes('overdue') && !status.includes('due') && isAfter(dueDate, today)
    })
  }, [plants, today])

  const {
    plantsCount,
    avgHydration,
    tasksDue,
    waterTasks,
    fertilizeTasks,
    noteTasks,
    waterOverdue,
    fertilizeOverdue,
    noteOverdue,
    taskStreak,
  } = usePlantMetrics(dueToday)

  const avgHydrationHistory = [65, 70, 68, 72, 75]

  const upcomingEvents = useMemo(() => {
    return upcoming
      .map(([id, p]) => ({
        id,
        type: p.status.toLowerCase().includes('fertilize')
          ? 'fertilize'
          : p.status.toLowerCase().includes('note')
          ? 'note'
          : 'water',
        date: p.nextDue,
        plant: p.nickname,
      }))
      .sort((a, b) => {
        const da = parse(`${a.date} ${today.getFullYear()}`, 'MMM d yyyy', today)
        const db = parse(`${b.date} ${today.getFullYear()}`, 'MMM d yyyy', today)
        return da.getTime() - db.getTime()
      })
  }, [upcoming, today])

  const TASK_ICONS = {
    water: Droplet,
    fertilize: Sprout,
    note: FileText,
  }

  const taskTypeCounts = {
    water: waterTasks,
    fertilize: fertilizeTasks,
    note: noteTasks,
  }

  return (
    <>
      <Header
        plantsCount={plantsCount}
        avgHydration={avgHydration}
        tasksDue={tasksDue}
        avgHydrationHistory={avgHydrationHistory}
        taskStreak={taskStreak}
        waterTasks={waterTasks}
        fertilizeTasks={fertilizeTasks}
        noteTasks={noteTasks}
        waterOverdue={waterOverdue}
        fertilizeOverdue={fertilizeOverdue}
        noteOverdue={noteOverdue}
      />
      <main className="flex-1 p-4 md:p-6 pb-20 md:pb-6">
        <div className="max-w-7xl mx-auto">
          <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 text-center">
            {Object.entries(taskTypeCounts).map(([type, count]) => (
              <div
                key={type}
                className="rounded-lg p-4 bg-gray-50 dark:bg-gray-800"
              >
                <p className="text-sm text-gray-600 dark:text-gray-300 capitalize">
                  {type}
                </p>
                <p className="h2 font-bold text-gray-900 dark:text-gray-100">
                  {count}
                </p>
              </div>
            ))}
          </section>

          <section>
            <h2 className="h2 mb-4">Due Today</h2>
            {dueToday.length ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {dueToday.map(([id, p]) => (
                  <PlantCard
                    key={id}
                    nickname={p.nickname}
                    species={p.species}
                    status={p.status}
                    hydration={p.hydration}
                    tasks={{
                      water: p.status.toLowerCase().includes('water') ? 1 : 0,
                      fertilize: p.status.toLowerCase().includes('fertilize') ? 1 : 0,
                      notes: p.status.toLowerCase().includes('note') ? 1 : 0,
                    }}
                    photo={p.photos[0]}
                  />
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">No tasks due today.</p>
            )}
          </section>

          <section className="mt-8">
            <h2 className="h2 mb-4">Upcoming</h2>
            {upcomingEvents.length ? (
              <ol className="relative border-l ml-4">
                {upcomingEvents.map((e) => {
                  const Icon = TASK_ICONS[e.type as keyof typeof TASK_ICONS]
                  const date = parse(
                    `${e.date} ${today.getFullYear()}`,
                    'MMM d yyyy',
                    today,
                  )
                  return (
                    <li key={e.id} className="mb-6 ml-6">
                      <span className="absolute -left-3 flex items-center justify-center w-6 h-6 rounded-full bg-white shadow ring-1 ring-gray-200 dark:bg-gray-700 dark:ring-gray-600">
                        <Icon className="w-3 h-3" />
                      </span>
                      <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                        <time className="text-sm text-gray-700 dark:text-gray-300">
                          {formatDistanceToNow(date, { addSuffix: true })}
                        </time>
                        <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                          {e.plant}
                        </span>
                      </div>
                    </li>
                  )
                })}
              </ol>
            ) : (
              <p className="text-sm text-gray-500">No upcoming tasks.</p>
            )}
          </section>

          <Footer />
        </div>
      </main>
    </>
  )
}

