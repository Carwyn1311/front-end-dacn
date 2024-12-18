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

export interface Destination {
  id: number;
  name: string;
  description: string;
  location: string;
  type: 'DOMESTIC' | 'INTERNATIONAL';
  city: number;
  created_at: string | null;
  docUrl: string;
  descriptionFile: DescriptionFile; // Mới thêm trường descriptionFile
  destinationImages: DestinationImage[];
}

export let destinationList: Destination[] = [];