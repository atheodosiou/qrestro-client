import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IMenuItem } from '../../shared/models/menu-item.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MenuItemsService {
  private readonly baseUrl = `${environment.serverUrl}/menu-items`;
  private readonly http = inject(HttpClient);

  getItems(): Observable<IMenuItem[]> {
    return this.http.get<IMenuItem[]>(this.baseUrl);
  }

  getItem(id: string): Observable<IMenuItem> {
    return this.http.get<IMenuItem>(`${this.baseUrl}/${id}`);
  }

  createItem(item: Partial<IMenuItem>): Observable<IMenuItem> {
    return this.http.post<IMenuItem>(this.baseUrl, item);
  }

  updateItem(id: string, item: Partial<IMenuItem>): Observable<IMenuItem> {
    return this.http.patch<IMenuItem>(`${this.baseUrl}/${id}`, item);
  }

  deleteItem(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
