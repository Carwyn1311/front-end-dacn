import axiosInstance from '../../AxiosInterceptor/Content/axiosInterceptor';
import { message } from 'antd';

export const destinationList: Destination[] = [];

// Định nghĩa interface cho các thực thể

export interface DestinationImage {
  id: number;
  image_url: string;
  destination_id: number;
}

export interface DescriptionFile {
  id: number;
  fileName: string;
  filePath: string;
  destination: null;
}

export interface Activity {
  id: number;
  activity_name: string;
  start_time: string; // ISO 8601 format string
  end_time: string; // ISO 8601 format string
  itinerary_id: number;
}

export interface Itinerary {
  id: number;
  start_date: string; // ISO 8601 format string
  end_date: string; // ISO 8601 format string
  activities: Activity[];
  destination_id: number;
}

export interface Destination {
  id: number;
  name: string;
  description: string | null;
  location: string;
  type: 'DOMESTIC' | 'INTERNATIONAL';
  city: number;
  created_at: string | null; // ISO 8601 format string
  descriptionFile: DescriptionFile;
  destinationImages: DestinationImage[];
  itineraries: Itinerary[];
  encodedPath?: string; 
}

const formatPath = (name: string): string => {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Loại bỏ dấu tiếng Việt
    .replace(/[^a-z0-9]+/g, "-") // Thay các ký tự không phải chữ và số bằng dấu gạch ngang
    .replace(/(^-|-$)/g, ""); // Loại bỏ dấu gạch ngang ở đầu và cuối
};


export const fetchDestinations = async () => {
  try {
    const response = await axiosInstance.get('/api/dest/list');
    destinationList.length = 0;

    // Gắn thêm `encodedPath` cho mỗi điểm đến
    const formattedDestinations = response.data.map((dest: Destination) => ({
      ...dest,
      encodedPath: `/travel/${dest.type === 'DOMESTIC' ? 'domestic' : 'international'}/${formatPath(dest.name)}`,
    }));

    destinationList.push(...formattedDestinations);
  } catch (error) {
    message.error('Không thể tải danh sách điểm đến');
  }
};


// Hàm phân loại điểm đến thành "trong nước" và "nước ngoài"
export const classifyDestinations = () => {
  const domestic = destinationList.filter((dest) => dest.type === 'DOMESTIC');
  const international = destinationList.filter((dest) => dest.type === 'INTERNATIONAL');

  return { domestic, international };
};


// Xóa điểm đến
export const deleteDestination = async (destinationId: number) => {
  try {
    await axiosInstance.delete(`/api/dest/${destinationId}`);
    message.success('Xóa điểm đến thành công');
    await fetchDestinations();
  } catch (error) {
    message.error('Lỗi khi xóa điểm đến');
  }
};
