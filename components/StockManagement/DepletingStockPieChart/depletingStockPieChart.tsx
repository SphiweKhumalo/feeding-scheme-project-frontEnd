import React, { useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { useGet } from 'restful-react';
import { Chart as ChartJS, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend);

export function DepletingStockPieChart() {
  const { data: apiData, refetch: fetchData } = useGet({
    path: 'BatchInformationService/StockExpiringSoon',
  });

  useEffect(() => {
    fetchData(); // Fetch data from the API when the component mounts
  }, []);

  const chartData = {
    labels: apiData?.result.map((item) => item.name) || [],
    datasets: apiData?.result.map((item) => ({
      data: item?.batchInformation?.map((batch) => batch.quantity),
      backgroundColor: getRandomColor(),
      hoverOffset: 4,
    })) || [],
  };

  function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Batch ID and Quantity',
      },
    },
  };

  return <Doughnut data={chartData} options={options} />;
}
