import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = ({ barData, options, id }: any) => {
  if (!barData) return null;
  return (
    <Bar
      options={{
        ...options,
        plugins: {
          ...options.plugins,
          title: { display: false, text: 'Categories used by type Money' },
        },
      }}
      data={barData}
      id={id}
    />
  );
};

export default BarChart;
