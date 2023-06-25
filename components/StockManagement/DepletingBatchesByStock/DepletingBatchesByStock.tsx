import { Card, message } from "antd";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { useGet } from "restful-react";
const { Meta } = Card;
const  DepletingBatch: React.FC= () => {
  const [dataSource, setDataSource] = useState<[]>([]);
  const { data: apiData, loading, error } = useGet({
    path: 'BatchInformationService/DepletingBatchesByStock'
  });

  useEffect(() => {
    if (error) {
      message.error('Failed to fetch data from the API.');
    } else if (apiData) {
      setDataSource(apiData.result);
    }
  }, [apiData, error]);

  const chartData = {
    labels: dataSource.map((item) => item.name),
    datasets: [
      {
        label: 'Quantity',
        data: dataSource.map((item) =>
          item.batchInformation.reduce(
            (sum, batch) => sum + batch.quantity,
            0
          )
        ),
        backgroundColor: 'red'
      }
    ]
  };

  return (
    <div style={{color:'blue',backgroundColor: 'transparent',width: '80%', height: '400px' }}>
      <Bar data={chartData} />
    </div>
  );
};
export default DepletingBatch;
