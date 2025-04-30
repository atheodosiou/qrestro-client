import { Component, inject } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-dashbaord',
  imports: [JsonPipe],
  templateUrl: './dashbaord.component.html',
  styleUrl: './dashbaord.component.scss'
})
export class DashbaordComponent {
  private readonly authService = inject(AuthService);

  decoded = this.authService.getDecodedToken();

  logout() {
    this.authService.logout();
  }
}
