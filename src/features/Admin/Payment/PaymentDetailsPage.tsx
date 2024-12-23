import React, { useEffect, useState } from 'react';
import { Table, Button, message, DatePicker, Select } from 'antd';
import axiosInstanceToken from '../../AxiosInterceptor/Content/axioslnterceptorToken';

const { RangePicker } = DatePicker;
const { Option } = Select;

interface PaymentDetail {
  id: number;
  amount: number;
  payment_date: string;
  status: string;
  invoiceCode: string;
  created_at: string;
  payment_method_id: number;
  user_id: number;
  booking_id: number;
}

const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  };
  return new Date(dateString).toLocaleDateString('en-GB', options).replace(',', '');
};

const isDateInRange = (dateString: string, startDate: Date, endDate: Date) => {
  const date = new Date(dateString);
  return date >= startDate && date <= endDate;
};

const PaymentDetailsPage: React.FC = () => {
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetail[]>([]);
  const [filteredPaymentDetails, setFilteredPaymentDetails] = useState<PaymentDetail[]>([]);
  const [statusFilter, setStatusFilter] = useState<string | undefined>(undefined);
  const [dateRange, setDateRange] = useState<[Date, Date] | null>(null);

  useEffect(() => {
    fetchPaymentDetails();
  }, []);

  const fetchPaymentDetails = async () => {
    try {
      const response = await axiosInstanceToken.get('/api/payments/list');
      setPaymentDetails(response.data);
      setFilteredPaymentDetails(response.data); // Set initial filtered data
    } catch (error) {
      message.error('Failed to fetch payment details');
    }
  };

  const updatePaymentStatus = async (id: number, status: string) => {
    try {
      await axiosInstanceToken.put(`/api/payments/${id}/status`, { status });
      message.success('Payment status updated successfully');
      fetchPaymentDetails(); // Refresh the list
    } catch (error) {
      message.error('Failed to update payment status');
    }
  };

  const handleDateRangeChange = (dates: [Date, Date] | null, dateStrings: [string, string]) => {
    setDateRange(dates);
    applyFilters(dates, statusFilter);
  };

  const handleStatusChange = (value: string) => {
    setStatusFilter(value);
    applyFilters(dateRange, value);
  };

  const applyFilters = (dateRange: [Date, Date] | null, statusFilter: string | undefined) => {
    let filteredData = paymentDetails;

    if (dateRange) {
      filteredData = filteredData.filter(payment =>
        isDateInRange(payment.payment_date, dateRange[0], dateRange[1])
      );
    }

    if (statusFilter) {
      filteredData = filteredData.filter(payment => payment.status === statusFilter);
    }

    setFilteredPaymentDetails(filteredData);
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Payment Date',
      dataIndex: 'payment_date',
      key: 'payment_date',
      render: (text: string) => formatDate(text),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Invoice Code',
      dataIndex: 'invoiceCode',
      key: 'invoiceCode',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text: any, record: PaymentDetail) => (
        <span>
          {record.status === 'PENDING' && (
            <>
              <Button type="primary" onClick={() => updatePaymentStatus(record.id, 'COMPLETED')}>Confirm</Button>
              <Button type="default" danger onClick={() => updatePaymentStatus(record.id, 'CANCELLED')} style={{ marginLeft: 8 }}>Cancel</Button>
            </>
          )}
        </span>
      ),
    },
  ];

  return (
    <div>
      <h1>Payment Details</h1>
      <div style={{ marginBottom: 16 }}>
        <RangePicker
          onChange={(dates, dateStrings) =>
            handleDateRangeChange(dates ? [new Date(dateStrings[0]), new Date(dateStrings[1])] : null, dateStrings)
          }
        />
        <Select
          placeholder="Select status"
          onChange={handleStatusChange}
          style={{ width: 120, marginLeft: 16 }}
        >
          <Option value="PENDING">PENDING</Option>
          <Option value="COMPLETED">COMPLETED</Option>
          <Option value="CANCELLED">CANCELLED</Option>
        </Select>
      </div>
      <Table dataSource={filteredPaymentDetails} columns={columns} rowKey="id" />
    </div>
  );
};

export default PaymentDetailsPage;
