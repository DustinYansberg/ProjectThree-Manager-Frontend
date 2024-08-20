import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../Models/employee';
import { AuthService } from './auth.service';
import { A } from '@fullcalendar/core/internal-common';

@Injectable()
export class AccountService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  url: String = 'http://localhost:8081/';

  private getHeaders() {
    return this.authService.getHeaders();
  }

  getAllAccounts() {
    return this.http.get(this.url + 'account', { headers: this.getHeaders(), observe: 'response' });
  }

  getAccountById(id: string) {
    return this.http.get(this.url + 'account/' + id, { headers: this.getHeaders(), observe: 'response' });
  }

  createAccount(accountDetails: any) {
    return this.http.post(this.url + 'account', accountDetails, { headers: this.getHeaders(), observe: 'response' });
  }

  deleteAccount(id: string) {
    return this.http.delete(this.url + 'account/' + id, { headers: this.getHeaders(), observe: 'response' });
  }

}
