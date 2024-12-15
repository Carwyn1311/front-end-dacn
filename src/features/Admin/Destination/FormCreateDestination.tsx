import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Button, Select, Upload, message, Steps } from 'antd';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import axiosInstance from '../../AxiosInterceptor/Content/axiosInterceptor';

const { Option } = Select;
const { Step } = Steps;

interface City {
  id: number;
  name: string;
  province: number;
}

interface FormCreateDestinationProps {
  onClose: () => void;
  onSuccess: () => void;
}

const FormCreateDestination: React.FC<FormCreateDestinationProps> = ({ onClose, onSuccess }) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<any[]>([]);
  const [descriptionFile, setDescriptionFile] = useState<any>(null);
  const [destinationId, setDestinationId] = useState<number | null>(null);
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const token = localStorage.getItem('token');

  // Fetch cities
  useEffect(() => {
    const fetchCities = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get('/api/city/list');
        setCities(response.data);
      } catch (error) {
        message.error('Không thể tải danh sách thành phố');
      } finally {
        setLoading(false);
      }
    };

    fetchCities();
  }, []);

  const handleNext = async (values?: any) => {
    if (currentStep === 0) {
      try {
        const destResponse = await axiosInstance.post('/api/dest/create', {
          name: values.name,
          description: values.description,
          location: values.location,
          city: { id: values.city }
        });
        setDestinationId(destResponse.data.id);
        setCurrentStep(currentStep + 1);
      } catch (error) {
        message.error('Lỗi khi tạo điểm đến');
      }
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async () => {
    if (destinationId === null) {
      message.error('Không tìm thấy ID điểm đến');
      return;
    }

    try {
      // Convert images to base64 and upload
      if (fileList.length > 0) {
        const imagesToSave = await Promise.all(fileList.map(async (file: any) => {
          const base64 = await getBase64(file.originFileObj);
          return {
            destination: { id: destinationId },
            image_url: base64
          };
        }));

        await axiosInstance.post('/api/dest/img', imagesToSave, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
      }

      // Upload file mô tả
      if (descriptionFile) {
        const formData = new FormData();
        formData.append('descriptionFile', descriptionFile);

        await axiosInstance.post(`/api/dest/upload-file/${destinationId}`, formData, {
          headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data' 
          }
        });
      }

      message.success('Tạo điểm đến thành công');
      onSuccess();
      onClose();
    } catch (error) {
      message.error('Lỗi khi tải ảnh hoặc file mô tả');
    }
  };

  const getBase64 = (file: File) => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  return (
    <Modal
      title="Thêm Điểm Đến Mới"
      visible={true}
      onCancel={onClose}
      footer={null}
      centered
      className="destlist-create-modal"
    >
      <Steps current={currentStep}>
        <Step title="Thông Tin Điểm Đến" />
        <Step title="Chọn Ảnh" />
        <Step title="Tải File Mô Tả" />
      </Steps>

      <div className="steps-content">
        {currentStep === 0 && (
          <Form 
            form={form} 
            layout="vertical" 
            onFinish={handleNext}
            className="destlist-create-form"
          >
            <Form.Item
              name="name"
              label="Tên Điểm Đến"
              rules={[{ required: true, message: 'Vui lòng nhập tên điểm đến' }]}
            >
              <Input placeholder="Nhập tên điểm đến" />
            </Form.Item>

            <Form.Item
              name="description"
              label="Mô Tả"
            >
              <Input.TextArea placeholder="Nhập mô tả" />
            </Form.Item>

            <Form.Item
              name="location"
              label="Địa Điểm"
              rules={[{ required: true, message: 'Vui lòng nhập địa điểm' }]}
            >
              <Input placeholder="Nhập địa điểm" />
            </Form.Item>

            <Form.Item
              name="city"
              label="Thành Phố"
              rules={[{ required: true, message: 'Vui lòng chọn thành phố' }]}
            >
              <Select placeholder="Chọn thành phố" loading={loading}>
                {cities.map(city => (
                  <Option key={city.id} value={city.id}>
                    {city.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="destlist-create-submit-btn">
                Tiếp Theo
              </Button>
            </Form.Item>
          </Form>
        )}

        {currentStep === 1 && (
          <div>
            <Form 
              form={form} 
              layout="vertical" 
              onFinish={handleNext}
              className="destlist-create-form"
            >
              <Form.Item
                name="images"
                label="Hình Ảnh"
              >
                <Upload
                  listType="picture-card"
                  fileList={fileList}
                  onChange={({ fileList }) => setFileList(fileList)}
                  multiple
                >
                  <div>
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </div>
                </Upload>
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" className="destlist-create-submit-btn">
                  Tiếp Theo
                </Button>
                <Button onClick={handlePrev} style={{ marginLeft: 8 }}>
                  Quay Lại
                </Button>
              </Form.Item>
            </Form>
          </div>
        )}

        {currentStep === 2 && (
          <div>
            <Form 
              form={form} 
              layout="vertical" 
              onFinish={handleSubmit}
              className="destlist-create-form"
            >
              <Form.Item
                name="descriptionFile"
                label="File Mô Tả"
              >
                <Upload
                  beforeUpload={(file) => {
                    setDescriptionFile(file);
                    return false; // Prevent automatic upload
                  }}
                  fileList={descriptionFile ? [descriptionFile] : []}
                >
                  <Button icon={<UploadOutlined />}>Chọn File</Button>
                </Upload>
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" className="destlist-create-submit-btn">
                  Hoàn Tất
                </Button>
                <Button onClick={handlePrev} style={{ marginLeft: 8 }}>
                  Quay Lại
                </Button>
              </Form.Item>
            </Form>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default FormCreateDestination;
