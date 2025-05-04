export interface IMenuItem {
  _id: string;
  name: string;
  description?: string;
  price?: number;
  imageUrl?: string;
  isAvailable: boolean;
}
