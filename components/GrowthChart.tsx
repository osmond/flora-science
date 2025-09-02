import { Line } from 'react-chartjs-2';
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
}

export const GrowthChart: React.FC<GrowthChartProps> = ({ data }) => {
  const chartData = {
    labels: data.map(d => d.date),
    datasets: [
      {
        label: 'Plant Height (cm)',
        data: data.map(d => d.height),
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
    <div className="bg-white dark:bg-gray-800 rounded p-4" aria-label="Growth chart panel">
      <div className="mb-2 text-sm text-gray-600 dark:text-gray-300" aria-live="polite">
        <strong>Growth Tracking:</strong> This chart shows plant height over time. Hover for details.
      </div>
      <div className="h-[220px]">
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};
