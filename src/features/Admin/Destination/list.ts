import axiosInstance from "../../AxiosInterceptor/Content/axiosInterceptor";

export interface Destination {
  id: number;
  name: string;
  description: string;
  location: string;
  type: 'DOMESTIC' | 'INTERNATIONAL';
  city: number;
  created_at: string | null;
  destinationImages: { id: number; image_url: string; destination_id: number }[];
}

export const getDestinationList = async (): Promise<{ key: string; label: string; onClick: () => void }[]> => {
  try {
    const response = await axiosInstance.get('/api/dest/list');
    const destinations: Destination[] = response.data;

    // Chuyển đổi danh sách destinations thành dạng menu item
    return destinations.map((destination) => ({
      key: `destination-${destination.id}`,
      label: destination.name,
      onClick: () => handleMenuClick(`/admin/destination/${destination.id}`),
    }));
  } catch (error) {
    console.error('Không thể tải danh sách điểm đến:', error);
    return [];
  }
};

// Hàm xử lý khi người dùng click vào menu item
const handleMenuClick = (path: string) => {
  console.log(`Đi đến đường dẫn: ${path}`);
  // Bạn có thể sử dụng React Router để chuyển hướng nếu cần
};
