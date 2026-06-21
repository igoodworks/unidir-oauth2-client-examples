import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';

  constructor(public auth: AuthService) {}

  async onDirectLogin() {
    try {
      this.errorMessage = '';
      await this.auth.login({ email: this.email, password: this.password });
    } catch (err: any) {
      this.errorMessage = 'Login failed: ' + err.message;
    }
  }

  onHostedLogin(): void {
    this.auth.login();
  }
}
