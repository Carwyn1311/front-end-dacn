import React, { useState } from 'react';
import { Checkbox, Form } from 'antd';

const TabNotification: React.FC = () => {
  const [form] = Form.useForm();
  const [checkedItems, setCheckedItems] = useState({
    submitTimesheet: false,
    requestOff: false,
    approveRejectOff: false,
    requestChangeTime: false,
    approveRejectChangeTime: false
  });

  const onChange = (e: any): void => {
    setCheckedItems({
      ...checkedItems,
      [e.target.name]: e.target.checked
    });
  };

  return (
    <Form form={form} layout="vertical" className="tab-notification-form">
      <h3>Komu Channel Id</h3>
      <Form.Item>
        <Checkbox
          name="submitTimesheet"
          checked={checkedItems.submitTimesheet}
          onChange={onChange}
        >
          Submit timesheet
        </Checkbox>
      </Form.Item>

      <Form.Item>
        <Checkbox
          name="requestOff"
          checked={checkedItems.requestOff}
          onChange={onChange}
        >
          Request Off/Remote/Onsite/Đi muộn, về sớm
        </Checkbox>
      </Form.Item>

      <Form.Item>
        <Checkbox
          name="approveRejectOff"
          checked={checkedItems.approveRejectOff}
          onChange={onChange}
        >
          Approve/Reject Request Off/Remote/Onsite/Đi muộn, về sớm
        </Checkbox>
      </Form.Item>

      <Form.Item>
        <Checkbox
          name="requestChangeTime"
          checked={checkedItems.requestChangeTime}
          onChange={onChange}
        >
          Request Change Working Time
        </Checkbox>
      </Form.Item>

      <Form.Item>
        <Checkbox
          name="approveRejectChangeTime"
          checked={checkedItems.approveRejectChangeTime}
          onChange={onChange}
        >
          Approve/Reject Change Working Time
        </Checkbox>
      </Form.Item>
    </Form>
  );
};

export default TabNotification;
