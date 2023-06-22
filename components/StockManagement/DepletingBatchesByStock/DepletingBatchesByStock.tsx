import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { useGet } from "restful-react";

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
        backgroundColor: 'rgb(224, 112, 46)'
      }
    ]
  };

  return (
    <div style={{backgroundColor: 'transparent',width: '400px', height: '300px' }}>
      <Bar data={chartData} />
    </div>
  );
};
export default DepletingBatch;
