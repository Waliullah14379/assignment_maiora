import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    const loginData = {
      email: this.username,
      password: this.password
    };
    this.http.post('https://api.escuelajs.co/api/v1/auth/login', loginData)
      .subscribe(
        (response: any) => {
          const token = response.access_token;
          // Save the token in localStorage or sessionStorage
          localStorage.setItem('authToken', token);
          // Navigate to the dashboard or home page after successful login
          this.router.navigate(['/student-leaves']);
        },
        (error) => {
          console.error('Login failed:', error);
        }
      );
  }
}
