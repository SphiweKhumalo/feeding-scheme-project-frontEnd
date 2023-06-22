  import { useEffect } from "react";
  import { Bar } from "react-chartjs-2";
  import { useGet } from "restful-react";

  export function StockExpiringSoon() {
    const { data: apiData, refetch: fetchData } = useGet({
      path: 'BatchInformationService/StockExpiringSoon',
    });

    useEffect(() => {
      fetchData(); // Fetch data from the API when the component mounts
    }, []);

    const chartData = {
      labels: apiData?.result.map((item) => item.name) || [],
      datasets: [
        {
          label: 'Quantity',
          data: apiData?.result.map((item) => item.quantity) || [],
          backgroundColor: 'goldenrod',
        },
      ],
    };

    return <Bar options={null} data={chartData} style={{ width: '30%', height: '100px' }}/>;
  }
