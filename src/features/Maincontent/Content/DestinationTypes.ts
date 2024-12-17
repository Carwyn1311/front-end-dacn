export interface DestinationImage {
    id: number;
    image_url: string;
    destination_id: number;
  }
  
  export interface Destination {
    id: number;
    name: string;
    description: string;
    location: string;
    type: 'DOMESTIC' | 'INTERNATIONAL';
    city: number;
    created_at: string | null;
    destinationImages: DestinationImage[];
  }
  