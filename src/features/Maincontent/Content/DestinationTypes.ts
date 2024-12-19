// DestinationTypes.ts

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
  itineraries: Itinerary[];
}

export interface Itinerary {
  id: number;
  start_date: string;
  end_date: string;
  activities: Activity[];
}

export interface Activity {
  id: number;
  activity_name: string;
  start_time: string;
  end_time: string;
}
