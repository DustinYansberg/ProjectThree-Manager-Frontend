import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // headers = new HttpHeaders({
  // });

  private isLoggedIn = false;

  username = "user";
  password = "0bf1b1c0-5ff8-4e1c-ade9-5edeaa072dd4";

  headers = new HttpHeaders({
    Authorization: 'Basic ' + btoa(this.username + ':' + this.password),
    'Access-Control-Allow-Origin': '*'
  });
  

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<boolean> {
    this.headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(username + ':' + password)
    });

    this.headers.append('Access-Control-Allow-Origin', '*');

    // if (username === 'spadmin' && password === 'admin') {
    //   this.isLoggedIn = true;
    //   return of(true);
    // } else {
    //   this.isLoggedIn = false;
    //   return of(false);
    // }

    return this.http.get('http://localhost:8081/employee', { headers: this.headers }).pipe(
      map(response => {
        this.isLoggedIn = true;
        return true;
      }),
      catchError(error => {
        console.log(error);
        this.isLoggedIn = false;
        return of(false);
      })
    );
  }

  logout() {
    this.isLoggedIn = false;
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn ;
  }

  getHeaders() {
    return this.headers;
  }
}
