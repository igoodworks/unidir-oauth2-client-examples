import { Injectable } from '@angular/core';
import UniDirClient from '@unidir/unidir-spa-js';
import { BehaviorSubject, filter, map, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private unidir: UniDirClient;

  // Tracks if the user is logged in
  private authState$ = new BehaviorSubject<boolean | null>(null);
  // Tracks if the app has finished checking for an existing session
  private initialized$ = new BehaviorSubject<boolean>(false);

  constructor(private router: Router) {
    this.unidir = new UniDirClient({
      domain: 'http://localhost/oauth/v1', // Replace with your UniDir URL
      clientId: 'sie8L2Vn9gViZmCCdRYuw72b4J93m5kI',
      redirectUri: window.location.origin + '/callback',
      logoutRedirectUri: window.location.origin,
      deviceId: this.getDeviceId(),
      jwks: 'https://oauth.biocloud.pro/jwks.json', //'http://localhost/jwks.json',
    });

    this.init();
  }

  /**
   * Generates or retrieves a unique, persistent device ID for the current browser.
   * @returns {string} The unique Device ID.
   */
  private getDeviceId = () => {
    const STORAGE_KEY = 'unidir_device_id';

    // 1. Check if an ID already exists in this browser
    let deviceId = localStorage.getItem(STORAGE_KEY);

    if (!deviceId) {
      // 2. Generate a new UUID v4
      // Use crypto.randomUUID() (modern browsers) or a fallback
      if (typeof crypto !== 'undefined' && crypto.randomUUID) {
        deviceId = crypto.randomUUID();
      } else {
        // Fallback for older browsers
        deviceId = 'fxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
          /[xy]/g,
          (c) => {
            const r = (Math.random() * 16) | 0;
            const v = c === 'x' ? r : (r & 0x3) | 0x8;
            return v.toString(16);
          }
        );
      }

      // 3. Persist it so it's the same next time the user visits
      localStorage.setItem(STORAGE_KEY, deviceId);
    }

    return deviceId;
  };

  private async init() {
    try {
      // 1. Handle the redirect callback if 'code' is in URL
      if (window.location.search.includes('code=')) {
        await this.unidir.handleRedirectCallback();
        // Clean URL
        window.history.replaceState(
          {},
          document.title,
          window.location.pathname
        );
      }

      // 2. Check for an existing session (Silent Refresh)
      const token = await this.unidir.getAccessToken();
      this.authState$.next(!!token);
    } catch (error) {
      console.error('Auth Init Error:', error);
      this.authState$.next(false);
    } finally {
      this.initialized$.next(true);
    }
  }

  // Getters
  get isAuthenticated$(): Observable<boolean> {
    return this.authState$.pipe(
      filter((val) => val !== null), // Wait until init is done
      map((val) => !!val)
    );
  }

  get isInitialized$(): Observable<boolean> {
    return this.initialized$.asObservable();
  }

  // Actions
  login() {
    this.unidir.loginWithRedirect();
  }
  logout() {
    this.unidir.logout();
  }
  async getAccessToken() {
    return await this.unidir.getAccessToken();
  }
  async getIdToken() {
    return await this.unidir.getIdToken();
  }
}
