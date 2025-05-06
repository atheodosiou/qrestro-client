import { Injectable, signal, computed } from '@angular/core';
import { IUser } from '../models/user.interface';
import { jwtDecode } from 'jwt-decode';

@Injectable({ providedIn: 'root' })
export class AuthStore {
    private token = signal<string | null>(localStorage.getItem('token'));
    private user = signal<IUser | null>(null);
    readonly isLoggedIn = computed(() => {
        const rawToken = this.token();
        if (!rawToken) return false;

        try {
            const { exp } = jwtDecode<{ exp: number }>(rawToken);
            const now = Math.floor(Date.now() / 1000);
            console.log("exp",exp)
            return exp > now && !!this.user();
        } catch {
            return false;
        }
    });
    readonly currentUser = computed(() => this.user());
    readonly userRole = computed(() => this.user()?.role);

    setToken(token: string) {
        this.token.set(token);
        localStorage.setItem('token', token);
    }

    getToken(): string | null {
        return this.token();
    }

    setUser(user: IUser) {
        this.user.set(user);
        localStorage.setItem('user', JSON.stringify(user));
    }

    getStoredUser(): IUser | null {
        const raw = localStorage.getItem('user');
        try {
            return raw ? JSON.parse(raw) : null;
        } catch {
            return null;
        }
    }

    clear() {
        this.token.set(null);
        this.user.set(null);
        localStorage.removeItem('token');
    }
} 