import React, { useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { useGet } from 'restful-react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom',
    },
    title: {
      display: true,
      text: 'Chart.js Bar Chart',
    },
  },
};

export function App() {
  const { data: apiData, refetch: fetchData } = useGet({
    path: 'BatchInformationService/GetBatchInformationByIngredient',
  });

  useEffect(() => {
    fetchData(); // Fetch data from the API when the component mounts
  }, []);

  const chartData = {
    labels: apiData?.result.map(item => item.name) || [],
    datasets: apiData?.result.map(item => ({
      label: item.name,
      data: item.batchInformation.map(batch => batch.quantity),
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    })) || [],
  };

  return <Bar options={options} data={chartData} />;
}
