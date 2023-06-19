import React, { useEffect, useState } from 'react';
import { Table, message } from 'antd';
import { useGet } from 'restful-react';
import styles from './styles.module.css';

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
  const { data: apiData, loading, error } = useGet({
    path: 'BatchInformationService/GetBatchInformationByIngredient'
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
      title: 'batch Id',
      dataIndex: 'batchInformation',
      key: 'prodDate',
      render: (batchInformation) => {
        if (batchInformation.length > 0) {
          return batchInformation.map((batch) => (
            <p key={batch.id}>{batch.id}</p>
          ));
        }
        return null;
      }
    },
    {
      title: 'Production Date',
      dataIndex: 'batchInformation',
      key: 'prodDate',
      render: (batchInformation) => {
        if (batchInformation.length > 0) {
          return batchInformation.map((batch) => (
            <p key={batch.id}>{batch.prodDate}</p>   //trim the date.
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
      title: 'Quantities',
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
    // <div className="batchCard-container">
    //   <Table
    //     className="batchCard-table"
    //     dataSource={dataSource}
    //     columns={columns}
    //     loading={loading}
    //     pagination={false}
    //     size='large'
    //     rowClassName={styles.rowClass}
    //     style={{ width: '2000px', height: '10' }} // Adjust the values as per your requirement
    //   />
    // </div>
    <>
        <div className={styles.MenuContainer}>
  {/* Content */}
</div>

<div className={styles.ContentContainer}>
  <div className={styles.divLeft}>
    {/* Left Content */}
  </div>
  <div className={styles.divRight}>
    {/* Right Content */}
  </div>
</div>

<h1 className={styles.h1}>Stock(batch)</h1>

<div className={styles.batchCardContainer}>
  <Table
    className={styles.batchCardtable}
    dataSource={dataSource}
    columns={columns}
    loading={loading}
    pagination={false}
    size="large"
    rowClassName={styles.rowClass}
    scroll={{ x: 800, y: 400 }}
  />
</div>

    </>
  );
};

export default DepletingBatch;
