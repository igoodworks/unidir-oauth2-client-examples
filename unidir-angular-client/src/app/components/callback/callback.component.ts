// src/app/components/callback/callback.component.ts
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-callback',
  template: `<p>Completing login... please wait.</p>`,
})
export class CallbackComponent implements OnInit {
  constructor(private auth: AuthService, private router: Router) {}

  async ngOnInit() {
    this.auth.isInitialized$.subscribe((initialized) => {
      if (initialized) {
        this.auth.isAuthenticated$.subscribe((isAuthed) => {
          // Navigate to a post-login page of your choosing
          this.router.navigateByUrl(isAuthed ? '/dashboard' : '/login');
        });
      }
    });

    // // The AuthService.init() already handles the 'code' in the URL.
    // // We just need to wait for a valid token before moving on.
    // const token = await this.auth.getAccessToken();

    // if (token) {
    //   this.router.navigate(['/dashboard']);
    // } else {
    //   this.router.navigate(['/login']);
    // }
  }

  onLogout(): void {
    this.auth.logout();
  }
}
