// src/app/app.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  template: `
    <div *ngIf="!(auth.isInitialized$ | async); else appContent">
      <p>Initializing Authentication...</p>
    </div>

    <ng-template #appContent>
      <nav *ngIf="!(auth.isAuthenticated$ | async)">
        <button (click)="auth.login()">Login with UniDir</button>
      </nav>
      <router-outlet></router-outlet>
    </ng-template>
  `,
})
export class AppComponent {
  constructor(public auth: AuthService) {}
}
