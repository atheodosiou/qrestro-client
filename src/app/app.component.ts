import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'QRestro';
  private readonly authService = inject(AuthService)

  ngOnInit(): void {
    //restore user on refresh
    this.authService.initUserFromToken();
  }
}
