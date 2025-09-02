import { Line } from 'react-chartjs-2';

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
      },
    ],
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded p-4">
      <Line data={chartData} />
    </div>
  );
};
