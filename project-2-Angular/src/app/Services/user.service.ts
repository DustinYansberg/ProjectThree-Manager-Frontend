import { Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public userEmail: string | null = null;
  user$: any;

  idSubject: BehaviorSubject<string> = new BehaviorSubject<string>("NULL");

  // Holds the getEmployeeId return value
  idObservable = this.idSubject.asObservable();

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

  getEmployeeId() {
    const apiUrl = `http://4.156.40.62:9001/employee/email/${this.userEmail}`;
    return this.http.get<any>(apiUrl, { observe: 'response' });
  }
}
