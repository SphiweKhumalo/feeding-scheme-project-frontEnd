// SupplierDropdown.tsx

import React from 'react';
import { Select } from 'antd';
import { useGet } from 'restful-react';

interface SupplierDropdownProps {
  onSelect: (value: string) => void;
}

const SupplierDropdown: React.FC<SupplierDropdownProps> = ({ onSelect }) => {
  const { data: supplierData, refetch: getSupplierssHttp } = useGet({
    path: `Supplier/GetAll`,
  });
  const handleChange = (value: string) => {
    onSelect(value);
  };
console.log('sup d',supplierData)
  return (
    <Select placeholder="Select a supplier" onChange={handleChange}>
      {/* Map over the supplierData to render the dropdown options */}
      {supplierData?.result.items.map((supplier: any) => (
        <Select.Option key={supplier.id} value={supplier.id}>
          {supplier.name}
        </Select.Option>
      ))}
    </Select>
  );
};

export default SupplierDropdown;
