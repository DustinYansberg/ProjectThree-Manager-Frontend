import { Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public userEmail: string | null = null;
  user$: any;

  constructor(private auth: AuthService, private http: HttpClient) {
    this.user$ = this.auth.user$;
    this.user$.subscribe((user) => {
      this.userEmail = user?.email || null;
    });
  }

  getUser(): Observable<any> {
    return this.user$;
  }

  getUserEmail(): string | null {
    return this.userEmail;
  }

  getEmployeeId(): Observable<string | null> {
    if (!this.userEmail) {
      return of(null);
    }

    const apiUrl = `http://4.156.40.62:9001/employee/email/${this.userEmail}`;

    return new Observable<string | null>((observer) => {
      this.http.get(apiUrl, { observe: 'response' }).subscribe({
        next: (response) => {
          const employeeResponse: any = response.body;
          if (employeeResponse && employeeResponse.id) {
            observer.next(employeeResponse.id);
          } else {
            observer.next(null);
          }
          observer.complete();
        },
        error: (err) => {
          console.log('Error fetching employee ID:', err.message);
          observer.error(err);
        },
      });
    });
  }
}
