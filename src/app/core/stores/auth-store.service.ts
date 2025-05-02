import { Injectable, signal, computed } from '@angular/core';
import { IUser } from '../models/user.interface';


@Injectable({ providedIn: 'root' })
export class AuthStore {
    private token = signal<string | null>(localStorage.getItem('token'));
    private user = signal<IUser | null>(null);

    readonly isLoggedIn = computed(() => !!this.token() && !!this.user());
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
    }

    clear() {
        this.token.set(null);
        this.user.set(null);
        localStorage.removeItem('token');
    }
} 