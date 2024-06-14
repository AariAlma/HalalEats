import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: ['./login.component.css']
})
export class LoginComponent {
  credentials: any = {};

  constructor(private authService: AuthService) {}

  onSubmit() {
    this.authService.login(this.credentials).subscribe(
      response => {
        console.log('Login successful', response);
        // successful login (storing token and redirecting)
      },
      error => {
        console.error('Login failed', error);
      }
    );
  }
}
