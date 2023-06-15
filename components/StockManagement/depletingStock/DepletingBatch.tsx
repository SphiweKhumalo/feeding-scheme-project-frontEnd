import React, { useEffect, useState } from 'react';
import { Table, message } from 'antd';
import { useGet } from 'restful-react';
import styles from './styles.module.css'

interface BatchCardProps {}

interface BatchItem {
  id: string;
  name: string;
  ingredientId: string;
  batchInformation: BatchInformation[];
}

interface BatchInformation {
  id: string;
  prodDate: string;
  expiryDate: string;
  quantity: number;
  supplierId: string;
}

const DepletingBatch: React.FC<BatchCardProps> = () => {
  const [dataSource, setDataSource] = useState<BatchItem[]>([]);
  const { data: apiData, loading, error } = useGet<any[]>({
    path: 'BatchInformationService/DepletingStock'
  });

  useEffect(() => {
    if (error) {
      message.error('Failed to fetch data from the API.');
    } else if (apiData) {
      setDataSource(apiData.result);
    }
  }, [apiData, error]);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name'
    },
    // {
    //   title: 'Ingredient ID',
    //   dataIndex: 'ingredientId',
    //   key: 'ingredientId'
    // },
    {
      title: 'Production Date',
      dataIndex: 'batchInformation',
      key: 'prodDate',
      render: (batchInformation) => {
        if (batchInformation.length > 0) {
          return batchInformation.map((batch) => (
            <p key={batch.id}>{batch.prodDate}</p>
          ));
        }
        return null;
      }
    },
    {
      title: 'Expiry Date',
      dataIndex: 'batchInformation',
      key: 'expiryDate',
      render: (batchInformation) => {
        if (batchInformation.length > 0) {
          return batchInformation.map((batch) => (
            <p key={batch.id}>{batch.expiryDate}</p>
          ));
        }
        return null;
      }
    },
    {
      title: 'Quantity',
      dataIndex: 'batchInformation',
      key: 'quantity',
      render: (batchInformation) => {
        if (batchInformation.length > 0) {
          return batchInformation.map((batch) => (
            <p key={batch.id} className="depletingP">
              {batch.quantity}
            </p>
          ));
        }
        return null;
      }
    },
    {
      title: 'Total Quantity',
      key: 'totalQuantity',
      render: (text, record) => {
        const totalQuantity = record.batchInformation.reduce(
          (sum, batch) => sum + batch.quantity,
          0
        );
        return <p className="batchCard-totalQuantity">{totalQuantity}</p>;
      }
    },
  ];

  return (
    <div className="batchCard-container">
      <Table
        className="batchCard-table"
        dataSource={dataSource}
        columns={columns}
        loading={loading}
        pagination={false}
        size="small"
        rowClassName={styles.rowClass}
        style={{ width: '20px', height: '10' }} // Adjust the values as per your requirement
      />
    </div>
  );
};

export default DepletingBatch;
