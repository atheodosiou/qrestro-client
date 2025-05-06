import { IBaseDocument } from '../../core/models/base-doc.interface';

// export interface TranslatableField {
//   [lang: string]: string;
// }

export interface IMenuItem extends IBaseDocument {
  name: string;
  description: string;
  isGlobal: boolean;
  price: number;
  imageUrl: string | null;
  isAvailable: boolean;
  status: number;
  popularity: number;
  defaultLanguage: string;
}
