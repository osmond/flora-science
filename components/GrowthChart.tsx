import { Line } from 'react-chartjs-2';
import { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);


interface GrowthDataPoint {
  date: string;
  height: number;
}

  interface GrowthChartProps {
    data: GrowthDataPoint[];
    heightPx?: number; // Optional chart height
  }

interface GrowthChartProps {
  data: GrowthDataPoint[];
  heightPx?: number; // Optional chart height
}

export const GrowthChart: React.FC<GrowthChartProps> = ({ data, heightPx = 220 }) => {
  const [showTable, setShowTable] = useState<boolean>(false);
  const metricExplanation = "Plant Height is measured from the base to the highest point of the plant. Tracking growth over time helps assess health and development.";
  const chartId = "growth-chart-panel";
  const tableId = "growth-chart-table";

  const chartData = {
    labels: data.map((d: GrowthDataPoint) => d.date),
    datasets: [
      {
        label: 'Plant Height (cm)',
        data: data.map((d: GrowthDataPoint) => d.height),
        borderColor: '#4ade80',
        backgroundColor: 'rgba(74, 222, 128, 0.2)',
        fill: true,
        tension: 0.3, // smooth sparkline
        pointRadius: 2,
      },
    ],
  };

  const chartOptions = {
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context: any) => `Height: ${context.parsed.y} cm on ${context.label}`,
        },
      },
    },
    scales: {
      x: {
        title: { display: true, text: 'Date' },
        ticks: { color: '#64748b' },
      },
      y: {
        title: { display: true, text: 'Height (cm)' },
        ticks: { color: '#64748b' },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded p-4" role="region" aria-label="Growth chart panel" aria-labelledby={chartId}>
      <div className="mb-2 flex items-center text-sm text-gray-600 dark:text-gray-300" aria-live="polite" id={chartId}>
        <strong>Growth Tracking:</strong> This chart shows plant height over time. Hover for details.
        <button
          type="button"
          className="ml-2 text-blue-500 hover:underline focus:outline-none focus:ring"
          aria-label="Show explanation of Plant Height metric"
          title="What does Plant Height mean?"
          onClick={() => window.alert(metricExplanation)}
        >
          ℹ️
        </button>
        <button
          type="button"
          className="ml-2 text-blue-500 hover:underline focus:outline-none focus:ring"
          aria-label={showTable ? "Hide growth data table" : "Show growth data table"}
          onClick={() => setShowTable(v => !v)}
        >
          {showTable ? "Hide Table" : "Show Table"}
        </button>
      </div>
      <div className={`h-[${heightPx}px]`}>
        <Line data={chartData} options={chartOptions} />
      </div>
      {showTable && (
        <div className="mt-4 overflow-x-auto">
          <table id={tableId} className="min-w-full text-xs border border-gray-200 dark:border-gray-700 rounded" aria-label="Growth data table">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700">
                <th className="px-2 py-1 text-left">Date</th>
                <th className="px-2 py-1 text-left">Height (cm)</th>
              </tr>
            </thead>
            <tbody>
              {data.map((d, i) => (
                <tr key={i} className={i % 2 ? "bg-gray-50 dark:bg-gray-800" : ""}>
                  <td className="px-2 py-1">{d.date}</td>
                  <td className="px-2 py-1">{d.height}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
