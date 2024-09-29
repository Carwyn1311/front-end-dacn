import { AiFillCaretDown } from 'react-icons/ai';
/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react';
import { useForm } from 'react-hook-form';
import { Button, Dropdown, Menu } from 'antd';

interface ListCheckButtonProps {
  items: string[]
  onSelectItem: (item: string) => void
  className?: string
}

interface FormValues {
  selectedItem: string | null
}

const ListCheckButton: React.FC<ListCheckButtonProps> = ({ items, onSelectItem, className }) => {
  const { setValue, watch } = useForm<FormValues>({
    defaultValues: { selectedItem: items[0] }
  });

  const selectedItem = watch('selectedItem');

  const handleItemClick = (item: string) => {
    setValue('selectedItem', item);
    onSelectItem(item);
  };

  // Tạo menu cho dropdown
  const menu = (
    <Menu>
      {items.map((item) => (
        <Menu.Item key={item} onClick={() => handleItemClick(item)}>
          {item}
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <div className={className}>
      <Dropdown overlay={menu} trigger={['click']} >
        <Button>
          {selectedItem || items[0]}  <AiFillCaretDown />
        </Button>
      </Dropdown>
    </div>
  );
};

export default ListCheckButton;
