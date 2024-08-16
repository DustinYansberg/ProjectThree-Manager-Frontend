import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private tokenSubject = new BehaviorSubject<string>('');
  token$ = this.tokenSubject.asObservable();

  setToken(token: string) {
    this.tokenSubject.next(token);
  }

  getToken(): string {
    return this.tokenSubject.getValue();
  }
}
