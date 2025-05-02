import { AfterViewInit, Component, inject } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';


declare const google: any;

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements AfterViewInit {
  private authService = inject(AuthService);
  private router = inject(Router);


  ngAfterViewInit(): void {
    google.accounts.id.initialize({
      client_id: environment.googleClientId,
      callback: (response: any) => this.handleGoogleResponse(response),
    });

  }

  handleCustomGoogleLogin() {
    google.accounts.id.prompt((notification: any) => {
      if (notification.isNotDisplayed()) {
        console.warn('Google login prompt was not displayed:', notification.getNotDisplayedReason());
      }

      if (notification.isSkippedMoment()) {
        console.warn('Google login skipped:', notification.getSkippedReason());
      }

      if (notification.isDismissedMoment()) {
        console.warn('Google login dismissed:', notification.getDismissedReason());
      }
    });
  }

  handleGoogleResponse(response: any) {
    const idToken = response.credential;

    this.authService.loginWithGoogle(idToken).subscribe({
      next: (res) => {
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.error('Login failed', err);
      },
    });
  }
}
