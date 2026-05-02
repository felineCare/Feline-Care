export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Appointment {
  id?: string;
  petName: string;
  ownerName: string;
  email: string;
  serviceId: string;
  date: string;
  time?: string;
  notes?: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: any;
}

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  imageUrl: string;
}
