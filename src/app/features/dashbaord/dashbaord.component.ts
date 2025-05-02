import { Component, inject } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { JsonPipe } from '@angular/common';
import { AuthStore } from '../../core/stores/auth-store.service';

@Component({
  selector: 'app-dashbaord',
  imports: [JsonPipe],
  templateUrl: './dashbaord.component.html',
  styleUrl: './dashbaord.component.scss'
})
export class DashbaordComponent {
  private readonly authService = inject(AuthService);
  private readonly authStore = inject(AuthStore);

  user = this.authStore.currentUser;

  logout() {
    this.authService.logout();
  }
}
