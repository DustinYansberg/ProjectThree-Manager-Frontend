import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AccountService {

  constructor(private http: HttpClient) { }

   //url: String = 'http://localhost:8082/';
  url: String = 'http://4.156.40.62:9001/'

  getAllAccounts() {
    return this.http.get(this.url + 'account', {observe: 'response' });
  }

  getAccountById(id: string) {
    return this.http.get(this.url + 'account/identity/' + id, { observe: 'response' });
  }

  createAccount(accountDetails: any) {
    return this.http.post(this.url + 'account', accountDetails, { observe: 'response' });
  }

  deleteAccount(id: string) {
    return this.http.delete(this.url + 'account/' + id, { observe: 'response' });
  }

}
