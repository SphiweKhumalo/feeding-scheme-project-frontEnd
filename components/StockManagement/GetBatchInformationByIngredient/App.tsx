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
      text: 'Stock Levels By Food Category',
    },
  },
};

export function BatchInformationByIngredient() {
  const { data: apiData, refetch: fetchData } = useGet({
    path: 'BatchInformationService/GetBatchInformationByIngredient',
  });

  useEffect(() => {
    fetchData(); // Fetch data from the API when the component mounts
  }, []);

  const colorPalette = [
    'rgba(255, 99, 132, 0.5)',
    'rgba(54, 162, 235, 0.5)',
    'rgba(255, 206, 86, 0.5)',
    // Add more colors as needed
  ];

  const chartData = {
    labels: apiData?.result.map(item => item.name) || [],
    datasets: apiData?.result.map((item, index) => ({
      data: item.batchInformation.map(batch => batch.quantity),
      backgroundColor: colorPalette[index % colorPalette.length], // Assign a color from the colorPalette based on index
    })) || [],
  };

  return <Bar  options={options} data={chartData} />;
}
