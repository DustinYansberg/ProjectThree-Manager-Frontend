import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //set to true to bypass authentication in development mode
  private isLoggedIn = true;

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  login(username: string, password: string): Observable<boolean> {
    const authString = btoa(username + ':' + password);
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + authString
    });

    return this.http.get('http://localhost:3000/api/users', { headers }).pipe(
      map(response => {
        this.isLoggedIn = true;
        this.tokenService.setToken(authString); // Store the token
        return true;
      }),
      catchError(error => {
        console.error(error);
        this.isLoggedIn = false;
        return of(false);
      })
    );
  }

  logout() {
    this.isLoggedIn = false;
    this.tokenService.setToken(''); // Clear the token
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }
}