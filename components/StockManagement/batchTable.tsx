import React, { useEffect, useState } from 'react';
import { Card, Spin } from 'antd';
import { useGet } from 'restful-react';

const BatchInformation = () => {
  const { data: batchData, loading, error, refetch } = useGet({
    path: 'BatchInformationService/GetBatchInformationByIngredient',
  });

  useEffect(() => {
    refetch(); // Fetch the data initially and whenever needed
  }, [refetch]);

  if (loading) {
    return <Spin size="large" />;
  }

  if (error) {
    return <div>Error: Failed to fetch data from the API.</div>;
  }

  return (
    <div>
      {batchData?.result.map((batch) => (
        <Card key={batch.id} title={batch.name} style={{ marginBottom: '16px' }}>
          {/* <p>Ingredient ID: {batch.ingredientId}</p>
          <p>Production Date: {batch.prodDate}</p>
          <p>Expiry Date: {batch.expiryDate}</p> */}
          <p>Quantity: {batch.quantity}</p>
          {/* <p>Supplier ID: {batch.supplierId}</p>
          <p>ID: {batch.id}</p> */}
        </Card>
      ))}
    </div>
  );
};

export default BatchInformation;
