import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { useGet } from "restful-react";

const StackedGraph = () => {
  const [batchInformation, setBatchInformation] = useState([]);
  const { loading, error, data: batchData } = useGet({
    path: 'BatchInformationService/GetBatchInformationByEachIngredientName',
  });


  useEffect(() => {
    if (batchData) {
      setBatchInformation(batchData.result);
    }
  }, [batchData]);

// ...

const createDatasets = () => {
  const datasets = batchInformation.map((name) => {
    const dataset = {
      label: name.name,
      data: [],
      backgroundColor: getRandomColor(),
      borderColor: getRandomColor(),
      borderWidth: 1,
      barThickness: 20,
    };

    name.batchInformation.forEach((batch) => {
      const { id, quantity } = batch;
      dataset.data.push({ x: id, y: quantity });
    });

    return dataset;
  });

  return datasets;
};

// ...

  
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
    <div style={{ width: '800px', height: '800px',backgroundColor:'transparent' }}>
      <h2>Batch Information</h2>
      <Bar data={chartData} />
    </div>
  );
};

export default StackedGraph;
 