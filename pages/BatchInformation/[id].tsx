import React, { useEffect, useState } from 'react';
import { Table, message, Popconfirm, Modal, Input } from 'antd';
import { useGet } from 'restful-react';
import styles from './styles.module.css';
import withAuth from '../login/hoc/withAuth';
import { useBatchInformation } from '../../Providers/BatchInformation';
import MyLayout from '../../components/Layout';
import { IBatchInformation } from '../../Providers/BatchInformation/context';
import axios from 'axios';

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

const BatchInformation: React.FC<BatchCardProps> = () => {
  const [dataSource, setDataSource] = useState<BatchItem[]>([]);
  const [batchData, setbatchData] = useState<any[]>([]);
  const [editingBatchId, setEditingBatchId] = useState<string>('');
  const [editingQuantity, setEditingQuantity] = useState<number>(0);
  const {
    BatchInformationState,
    getBatchInformation,
    deleteBatchInformation,
    updateBatchInformation
  } = useBatchInformation();

  useEffect(() => {
    getBatchInformation();
    console.log('getBatchInformation');
  }, []);

  useEffect(() => {
    if (BatchInformationState) {
      setbatchData(BatchInformationState);
    }
  }, [BatchInformationState]);

  console.log('batchinforstate', BatchInformationState);

  const handleDelete = (batchId: string) => {
    console.log('batchId', batchId);
    deleteBatchInformation(batchId);
  };

  const handleEdit = (updatedBatch: IBatchInformation) => {
    console.log(updatedBatch, ':baTCH UPSDATED');
    setEditingBatchId(updatedBatch.id);
    setEditingQuantity(updatedBatch.quantity);
  };

  const handleSave = async () => {
      const updatedBatch :IBatchInformation = {
        id: editingBatchId,
        quantity: editingQuantity
      };
        updateBatchInformation(updatedBatch);
  };
  

  const closeModal = () => {
    setEditingBatchId('');
    setEditingQuantity(0);
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Batch ID',
      dataIndex: 'batchInformation',
      key: 'batchId',
      render: (batchInformation, record) => {
        if (batchInformation.length > 0) {
          return batchInformation.map((batch) => <p key={batch.id}>{batch.id}</p>);
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
          return batchInformation.map((batch) => <p key={batch.id}>{batch.prodDate}</p>);
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
          return batchInformation.map((batch) => <p key={batch.id}>{batch.expiryDate}</p>);
        }
        return null;
      }
    },
    {
      title: 'Quantity',
      dataIndex: 'batchInformation',
      key: 'quantity',
      render: (batchInformation, record) => {
        if (batchInformation.length > 0) {
          return batchInformation.map((batch) => (
            <p key={batch.id} className="depletingP">
              {batch.quantity}
              <button onClick={() => handleEdit(batch)}>Edit</button>
              <Popconfirm
                title="Are you sure to delete this batch?"
                onConfirm={() => handleDelete(batch.id)}
                okText="Yes"
                cancelText="No"
              >
                <button>Delete</button>
              </Popconfirm>

              {editingBatchId === batch.id && (
                 <div>
                 <Input
                   type="number"
                   value={editingQuantity}
                   onChange={(e) => setEditingQuantity(Number(e.target.value))}
                 />
                 <button onClick={() => handleSave(batch.id)}>Save</button> {/* Pass batch as an argument */}
               </div>
              )}
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
    }
  ];

  return (
    <MyLayout>
      <div className="batchCard-container">
        <Table
          className="batchCard-table"
          dataSource={BatchInformationState}
          columns={columns}
          pagination={false}
          size="large"
          rowClassName={styles.rowClass}
          style={{ width: '2000px', height: '10' }}
        />

        <Modal
          title="Edit Stock Count"
          visible={!!editingBatchId}
          onOk={handleSave}
          onCancel={closeModal}
        >
          <Input
            type="number"
            value={editingQuantity}
            onChange={(e) => setEditingQuantity(Number(e.target.value))}
          />
        </Modal>
      </div>
    </MyLayout>
  );
};

export default withAuth(BatchInformation);
