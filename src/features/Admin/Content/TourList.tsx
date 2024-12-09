import React, { useEffect, useState } from 'react';
import { message, Spin } from 'antd';
import axios from 'axios';
import { TokenAuthService } from '../../TokenAuthService/TokenAuthService';

interface DescriptionFile {
  id: number;
  fileName: string;
  filePath: string;
  destination: any;
}

interface DestinationImage {
  id: number;
  image_url: string;
  destination_id: number;
}

interface Destination {
  id: number;
  name: string;
  description: string;
  descriptionFile: DescriptionFile | null;
  location: string;
  created_at: string | null;
  destinationImages: DestinationImage[];
  type: string;
  city: number;
}

const DanhSachTour = () => {
  const [tours, setTours] = useState<Destination[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  // Hàm tải danh sách tour
  const loadTours = async () => {
    setLoading(true);
    setError('');

    try {
      const token = TokenAuthService.getToken();
      console.log("Token:", token);  // Log token để kiểm tra

      if (!token) {
        setError('Token không hợp lệ hoặc hết hạn');
        message.error('Token không hợp lệ hoặc hết hạn');
        setLoading(false);
        return;
      }

      const response = await axios.get<Destination[]>('https://multiply-equipped-squid.ngrok-free.app/api/dest/list', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      console.log('Toàn bộ response:', response);  // Log toàn bộ response
      console.log('Dữ liệu trả về:', response.data);  // Log dữ liệu trả về từ API

      // Kiểm tra nếu response.data là một mảng và có dữ liệu hợp lệ
      if (Array.isArray(response.data) && response.data.length > 0) {
        const validData = response.data.every(tour =>
          tour.id &&
          typeof tour.name === 'string' &&
          typeof tour.description === 'string' &&
          Array.isArray(tour.destinationImages) &&
          tour.destinationImages.every(img => img.id && typeof img.image_url === 'string')
        );

        if (validData) {
          setTours(response.data);
          message.success('Tải danh sách tour thành công');
        } else {
          throw new Error('Dữ liệu tour không hợp lệ');
        }
      } else {
        throw new Error('Dữ liệu trả về không phải mảng hoặc không có dữ liệu');
      }
    } catch (error: any) {
      console.error('Lỗi khi tải danh sách tour:', error);  // Log toàn bộ lỗi từ catch
      const errorMessage = error?.response?.data?.message || error?.message || 'Lỗi khi tải danh sách tour';
      setError(errorMessage);
      message.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTours();
  }, []);

  return (
    <div>
      {loading ? (
        <Spin tip="Đang tải danh sách tour..." />
      ) : error ? (
        <div style={{ color: 'red' }}>{error}</div>
      ) : (
        <div>
          {tours.length > 0 ? (
            <div>
              {tours.map((tour) => (
                <div key={tour.id} style={{ marginBottom: '20px', borderBottom: '1px solid #ddd', paddingBottom: '10px' }}>
                  <h3>{tour.name}</h3>
                  <p>{tour.description}</p>
                  <p><strong>Địa điểm:</strong> {tour.location}</p>
                  <p><strong>Loại:</strong> {tour.type}</p>
                  <p><strong>Thành phố:</strong> {tour.city}</p>
                  {tour.created_at && <p><strong>Ngày tạo:</strong> {new Date(tour.created_at).toLocaleString()}</p>}

                  {/* Hiển thị file mô tả nếu có */}
                  {tour.descriptionFile && (
                    <div>
                      <p><strong>Tệp mô tả:</strong> {tour.descriptionFile.fileName}</p>
                      <p><strong>Đường dẫn tệp:</strong> {tour.descriptionFile.filePath}</p>
                    </div>
                  )}

                  <div>
                    <strong>Hình ảnh:</strong>
                    {tour.destinationImages.length > 0 ? (
                      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                        {tour.destinationImages.map((image) => (
                          <img
                            key={image.id}
                            src={image.image_url}
                            alt={`Hình ảnh của ${tour.name}`}
                            style={{ width: '100px', marginRight: '10px', marginBottom: '10px' }}
                          />
                        ))}
                      </div>
                    ) : (
                      <p>Không có hình ảnh</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>Không có tour nào.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default DanhSachTour;
