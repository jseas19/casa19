import { Injectable, signal } from '@angular/core';

export interface UserSession {
  username: string;
  email: string;
  role: string;
  token?: string;
  dbServer: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly sessionKey = 'casa19_active_session';

  public userSessionSignal = signal<UserSession | null>(null);

  constructor() {
    this.restoreSession();
  }

  public restoreSession(): void {
    const saved = localStorage.getItem(this.sessionKey);
    if (saved) {
      try {
        this.userSessionSignal.set(JSON.parse(saved));
      } catch {
        this.setDefaultSession();
      }
    } else {
      this.setDefaultSession();
    }
  }

  public setDefaultSession(): void {
    const defaultSession: UserSession = {
      username: 'jseas_admin',
      email: 'jseas@casa19.local',
      role: 'Project Admin',
      dbServer: 'PostgreSQL 17.6 (casa19_db)',
      token: 'mock-jwt-session-casa19-token'
    };
    this.userSessionSignal.set(defaultSession);
    localStorage.setItem(this.sessionKey, JSON.stringify(defaultSession));
  }

  public logout(): void {
    localStorage.removeItem(this.sessionKey);
    this.userSessionSignal.set(null);
  }
}
