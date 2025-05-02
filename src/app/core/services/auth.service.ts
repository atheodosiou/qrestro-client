import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';

import { tap, switchMap } from 'rxjs/operators';
import { AuthStore } from '../stores/auth-store.service';
import { IUser } from '../models/user.interface';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly authStore = inject(AuthStore);
  private readonly router = inject(Router);

  private readonly apiUrl = `${environment.serverUrl}/auth`;

  logout() {
    this.authStore.clear();
    this.router.navigate(['/login']);
  }

  loginWithGoogle(idToken: string) {
    return this.http
      .post<{ access_token: string }>(`${this.apiUrl}/google`, { id_token: idToken })
      .pipe(
        tap(res => this.authStore.setToken(res.access_token)),
        switchMap(() => this.fetchCurrentUser()),
        tap(user => this.authStore.setUser(user))
      );
  }

  fetchCurrentUser() {
    return this.http.get<IUser>(`${this.apiUrl}/me`);
  }

  initUserFromToken() {
    const token = this.authStore.getToken();
    if (!token) return;

    const { exp } = jwtDecode<{ exp: number }>(token);
    const now = Math.floor(Date.now() / 1000);

    if (exp < now) {
      this.logout();
      return;
    }

    const cachedUser = this.authStore.getStoredUser();
    if (cachedUser) {
      this.authStore.setUser(cachedUser); // Use cached user immediately
    } else {
      // Fallback if cache is missing (rare)
      this.fetchCurrentUser().subscribe({
        next: user => this.authStore.setUser(user),
        error: () => this.logout()
      });
    }
  }
}
