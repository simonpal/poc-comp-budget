import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

type BarChartProps = {
  barData: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string[];
      borderWidth: number;
    }[];
  };
  options: {
    responsive: boolean;
    plugins: {
      legend: {
        position: "top";
      };
      title: {
        display: boolean;
        text: string;
      };
    };
  };
  id: string;
};

const BarChart = ({ barData, options, id }: BarChartProps) => {
  if (!barData) return null;
  return (
    <Bar
      options={{
        ...options
      }}
      data={barData}
      id={id}
    />
  );
};

export default BarChart;
