import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.serverUrl}/auth`;

  constructor() { }

  loginWithGoogle(idToken: string) {
    return this.http.post<{ access_token: string; user?: any }>(
      `${this.apiUrl}/google`,
      { id_token: idToken }
    );
  }
}
