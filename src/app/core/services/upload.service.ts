import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  private readonly baseUrl = `${environment.serverUrl}/upload`;
  private readonly http = inject(HttpClient);

  removeUploadedImage(url: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/image?filename=${url}`);
  }
}
