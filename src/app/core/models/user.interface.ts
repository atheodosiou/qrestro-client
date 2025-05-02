import { IBaseDocument } from "./base-doc.interface";

export interface IUser extends IBaseDocument {
    email: string;
    name?: string;
    picture?: string;
    googleId?: string;
    provider: 'local' | 'google';
    role: 'owner' | 'admin';
    isActive: boolean;
}