// src/app/components/dashboard/dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  userData: any;
  accessToken: string | null = null;

  constructor(private auth: AuthService) {}

  async ngOnInit() {
    this.userData = await this.auth.getIdToken();
    this.accessToken = await this.auth.getAccessToken();
  }

  onLogout(): void {
    this.auth.logout();
  }
}
