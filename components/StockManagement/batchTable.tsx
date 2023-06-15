import React, { useEffect, useState } from 'react';
import { List, message } from 'antd';
import { useGet } from 'restful-react';
import styles from './styles.module.css';

const BatchTable: React.FC = () => {
  const [dataSource, setDataSource] = useState([]);
  const { data: apiData, loading, error } = useGet({ path: 'BatchInformationService/DepletingStock' });

  useEffect(() => {
    if (error) {
      message.error('Failed to fetch data from the API.');
    } else if (apiData) {
      setDataSource(apiData.result);
    }
  }, [apiData, error]);

  return (
    <div className={styles.dashboard}>
      <List className= {styles.listStyle}
        dataSource={dataSource}
        renderItem={(item) => (
          <List.Item   className= {styles.listStyle}>
            <List.Item.Meta
              title={item.name}
              description={`Ingredient ID: ${item.ingredientId}`}
            />
            <div className={styles.batchInfo}>
              {item.batchInformation.map((batch) => (
                <React.Fragment key={batch.id}>
                  <p>Production Date: {batch.prodDate}</p>
                  <p>Expiry Date: {batch.expiryDate}</p>
                  <p className={styles.depletingP}>Quantity: {batch.quantity}</p>
                  <p>Supplier ID: {batch.supplierId}</p>
                </React.Fragment>
              ))}
              <p className={styles.totalQuantity}>Total Quantity: {item.batchInformation.reduce((sum, batch) => sum + batch.quantity, 0)}</p>
              <p>Total Suppliers: {item.batchInformation.length}</p>
              <p>ID: {item.id}</p>
            </div>
          </List.Item>
        )}
      />
    </div>
  );
};

export default BatchTable;
