import { Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userEmail: string;
  user$: any;

  idSubject: BehaviorSubject<string> = new BehaviorSubject<string>("");

  // Holds the getEmployeeId return value
  idObservable = this.idSubject.asObservable();

  constructor(private auth: AuthService, private http: HttpClient) {
    this.user$ = this.auth.user$;
    this.user$.subscribe((user) => {
      console.log(user?.email);
      this.userEmail = user?.email;
    });
  }

  getUser(): Observable<any> {
    return this.user$;
  }

  getUserEmail(): string {
    return this.userEmail;
  }

  getEmployeeId() {
    console.log(this.userEmail);
    const apiUrl = `http://4.156.40.62:9001/employee/email/${this.userEmail}`;
    return this.http.get<any>(apiUrl, { observe: 'response' });
  }
}
