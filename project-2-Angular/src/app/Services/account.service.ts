import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../Models/employee';
import { AuthService } from './auth.service';
import { AccountDetail } from '../Models/accountDetails';
import { A } from '@fullcalendar/core/internal-common';

@Injectable()
export class AccountService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  url: String = 'http://localhost:3000/';

  private getHeaders() {
    return this.authService.getHeaders();
  }

  getAllAccounts() {
    return this.http.get(this.url + 'api/accounts', { headers: this.getHeaders(), observe: 'response' });
  }

  getAccountById(id: string) {
    return this.http.get(this.url + 'api/accounts/' + id, { headers: this.getHeaders(), observe: 'response' });
  }

  createAccount(accountDetails: AccountDetail) {
    return this.http.post(this.url + 'api/accounts', accountDetails, { headers: this.getHeaders(), observe: 'response' });
  }

  deleteAccount(id: string) {
    return this.http.delete(this.url + 'api/accounts/' + id, { headers: this.getHeaders(), observe: 'response' });
  }

}
