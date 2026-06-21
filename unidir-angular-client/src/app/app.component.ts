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
      <div style="display: flex; justify-content: center; align-items: center; height: 100vh;">
         <p>Initializing Authentication...</p>
      </div>
    </div>

    <ng-template #appContent>
      <router-outlet></router-outlet>
    </ng-template>
  `,
})
export class AppComponent {
  constructor(public auth: AuthService) {}
}
