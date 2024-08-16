import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AccountDetail } from '../Models/accountDetails';

@Injectable()
export class AccountService {

  private url: string = 'http://localhost:3000/';

  constructor(private http: HttpClient) { }

  getAllAccounts() {
    return this.http.get(this.url + 'api/accounts', { observe: 'response' });
  }

  getAccountById(id: string) {
    return this.http.get(this.url + 'api/accounts/' + id, { observe: 'response' });
  }

  createAccount(accountDetails: AccountDetail) {
    return this.http.post(this.url + 'api/accounts', accountDetails, { observe: 'response' });
  }

  deleteAccount(id: string) {
    return this.http.delete(this.url + 'api/accounts/' + id, { observe: 'response' });
  }

}
