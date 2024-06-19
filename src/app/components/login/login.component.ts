import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

//@Component({
@Component({
selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

interface LoginResponse {
  success: boolean;
  message?: string;
}

export class LoginComponent {
  credentials: any = {};

  constructor(private authService: AuthService) {}

  onSubmit() {
    this.authService.login(this.credentials).subscribe(
      (response: LoginResponse) => {
        console.log('Login successful', response);
        // successful login (storing token and redirecting)
      },
      (error: any) => {
        console.error('Login failed', error);
      }
    );
  }
}
