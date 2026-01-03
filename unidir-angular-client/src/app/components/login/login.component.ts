import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  // Inject the AuthService to access login/logout and state
  constructor(public auth: AuthService) {}

  onLogin(): void {
    this.auth.login();
  }
}
