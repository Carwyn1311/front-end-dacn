import React, { useState, useEffect } from 'react';
import { Modal, Steps, message } from 'antd';
import axiosInstance from '../../AxiosInterceptor/Content/axiosInterceptor';
import DestinationInfoForm from './form/DestinationInfoForm';
import ImageUploadForm from './form/ImageUploadForm';
import DescriptionFileUploadForm from './form/DescriptionFileUploadForm';
import TicketPricesForm from './form/TicketPricesForm';
import FormCreateItinerary from './form/FormCreateItinerary';

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
  const [destinationId, setDestinationId] = useState<number | null>(null);
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [fileList, setFileList] = useState<any[]>([]);
  const [descriptionFile, setDescriptionFile] = useState<File | null>(null);
  const [itinerary, setItinerary] = useState<any | null>(null);
  const token = localStorage.getItem('token');

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
    } else if (currentStep === 1 || currentStep === 2 || currentStep === 3) {
      setCurrentStep(currentStep + 1);
    } else if (currentStep === 4) {
      setItinerary(values);
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

      if (itinerary) {
        await axiosInstance.post('/api/itineraries/create', itinerary, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
      }

      message.success('Tạo điểm đến thành công');
    } catch (error) {
      message.error('Lỗi khi tải ảnh hoặc file mô tả');
    }
  };

  const handleFinish = async (values: any) => {
    setLoading(true);
    try {
      await handleSubmit();

      const ticketPrices = {
        destination_id: destinationId, 
        adult_price: Number(values.adult_price),
        child_price: Number(values.child_price),
      };

      console.log('Dữ liệu gửi đi:', ticketPrices);

      await axiosInstance.post('/api/ticketprices/create', ticketPrices, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      message.success('Lưu giá vé thành công');
      onSuccess();
      onClose();
    } catch (error) {
      message.error('Lỗi khi lưu giá vé');
      setLoading(false);
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
        <Step title="Hành Trình" />
        <Step title="Giá Vé" />
      </Steps>

      <div className="steps-content">
        {currentStep === 0 && (
          <DestinationInfoForm
            onNext={handleNext}
            cities={cities}
            loading={loading}
          />
        )}

        {currentStep === 1 && (
          <ImageUploadForm
            onNext={handleNext}
            onPrev={handlePrev}
            fileList={fileList}
            setFileList={setFileList}
          />
        )}

        {currentStep === 2 && (
          <DescriptionFileUploadForm
            onNext={handleNext}
            onPrev={handlePrev}
            descriptionFile={descriptionFile}
            setDescriptionFile={setDescriptionFile}
          />
        )}

        {currentStep === 3 && (
          destinationId && (
            <FormCreateItinerary
              onNext={(values: any) => {
                setItinerary(values);
                setCurrentStep(currentStep + 1);
              }}
              onPrev={handlePrev}
              destinationId={destinationId}
            />
          )
        )}

        {currentStep === 4 && (
          <TicketPricesForm
            onFinish={handleFinish}
            onPrev={handlePrev}
            loading={loading}
          />
        )}
      </div>
    </Modal>
  );
};

export default FormCreateDestination;
