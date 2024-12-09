// Định nghĩa interface Tour với destinationImages là mảng các chuỗi (string[])
export interface Tour {
  id: number;
  image: string;
  title: string;
  subtitle: string;
  price: string;
  discount: string;
  duration: string;
  url: string;
  destinationImages: string[]; // URL ảnh cho tour
}

// Mảng tours với thuộc tính destinationImages được thêm vào mỗi đối tượng
export const tours: Tour[] = [
  {
    id: 1,
    image: '/images/ha-long-1.jpg',
    title: 'Tour Du Lịch Úc',
    subtitle: 'Melbourne - Sydney',
    price: '64.999.000đ',
    discount: '15%',
    duration: '7 ngày',
    url: '/tours/du-lich-uc',
    destinationImages: [
      '/images/ha-long-1.jpg',
      '/images/ha-long-2.jpg',
      '/images/ha-long-3.jpg',
    ],
  },
  {
    id: 2,
    image: '/images/Tokyo_japan.jpg',
    title: 'Tour Du Lịch Nhật Bản',
    subtitle: 'Tokyo - Kyoto',
    price: '54.999.000đ',
    discount: '10%',
    duration: '5 ngày',
    url: '/tours/du-lich-nhat-ban',
    destinationImages: [
      '/images/Tokyo_japan.jpg',
      '/images/Tokyo_japan_2.jpg',
      '/images/Tokyo_japan_3.jpg',
    ],
  },
  {
    id: 3,
    image: '/images/america.jpg',
    title: 'Tour Du Lịch Mỹ',
    subtitle: 'New York - Los Angeles',
    price: '84.999.000đ',
    discount: '20%',
    duration: '10 ngày',
    url: '/tours/du-lich-my',
    destinationImages: [
      '/images/america.jpg',
      '/images/america_2.jpg',
      '/images/america_3.jpg',
    ],
  },
  {
    id: 4,
    image: '/images/korea.jpg',
    title: 'Tour Du Lịch Hàn Quốc',
    subtitle: 'Seoul - Busan',
    price: '44.999.000đ',
    discount: '18%',
    duration: '6 ngày',
    url: '/tours/du-lich-han-quoc',
    destinationImages: [
      '/images/korea.jpg',
      '/images/korea_2.jpg',
      '/images/korea_3.jpg',
    ],
  },
  {
    id: 5,
    image: '/images/Paris.jpg',
    title: 'Tour Du Lịch Pháp',
    subtitle: 'Paris - Lyon',
    price: '94.999.000đ',
    discount: '12%',
    duration: '9 ngày',
    url: '/tours/du-lich-phap',
    destinationImages: [
      '/images/Paris.jpg',
      '/images/Paris_2.jpg',
      '/images/Paris_3.jpg',
    ],
  },
  {
    id: 6,
    image: '/images/TrungQuoc-1.jpg',
    title: 'Tour Du Lịch Trung Quốc',
    subtitle: 'Thâm Quyến',
    price: '94.999.000đ',
    discount: '12%',
    duration: '9 ngày',
    url: '/tours/nuoc-ngoai/chau-a/trung-quoc',
    destinationImages: [
      '/images/TrungQuoc-1.jpg',
      '/images/TrungQuoc-2.jpg',
      '/images/TrungQuoc-3.jpg',
    ],
  },
];
