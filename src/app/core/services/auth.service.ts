import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { jwtDecode } from 'jwt-decode';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.serverUrl}/auth`;

  private tokenKey = 'token';

  logout() {
    localStorage.removeItem(this.tokenKey);
    window.location.href = '/login'; // or use Angular router
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getDecodedToken(): any {
    const token = this.getToken();
    if (!token) return null;

    try {
      return jwtDecode(token);
    } catch (e) {
      return null;
    }
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    if (!token) return false;

    try {
      const { exp } = jwtDecode<{ exp: number }>(token);
      return exp > Math.floor(Date.now() / 1000);
    } catch {
      return false;
    }
  }


  loginWithGoogle(idToken: string) {
    return this.http.post<{ access_token: string; user?: any }>(
      `${this.apiUrl}/google`,
      { id_token: idToken }
    );
  }
}
