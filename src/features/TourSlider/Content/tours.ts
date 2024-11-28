export interface Tour {
    id: number;
    image: string;
    title: string;
    subtitle: string;
    price: string;
    discount: string;
    duration: string;
    url: string;
  }
  
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
    },

  ];
  
  
  