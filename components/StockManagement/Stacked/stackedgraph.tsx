import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { useGet } from "restful-react";

const StackedGraph = () => {
  const [batchInformation, setBatchInformation] = useState([]);
  const { loading, error, data: batchData } = useGet({
    path: 'BatchInformationService/GetBatchInformationByIngredient',
  });


  useEffect(() => {
    if (batchData) {
      setBatchInformation(batchData.result);
    }
  }, [batchData]);

  const createDatasets = () => {
    const datasets = batchInformation.map((category) => {
      const labels = category.batchInformation.map((batch) => batch.id);
      const quantities = category.batchInformation.map((batch) => batch.quantity);
      const backgroundColor = getRandomColor();
      return {
        label: category.name,
        data: quantities,
        backgroundColor: backgroundColor,
        borderColor: backgroundColor,
        borderWidth: 1,
        barThickness: 20,
      };
    });
    return datasets;
  };

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const chartData = {
    labels: batchInformation.length > 0 ? batchInformation[0].batchInformation.map((batch) => batch.id) : [],
    datasets: createDatasets(),
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching batch information: {error.message}</div>;
  }

  return (
    <div style={{ width: '800px', height: '800px' }}>
      <h2>Batch Information</h2>
      <Bar data={chartData} />
    </div>
  );
};

export default StackedGraph;
 