import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../Models/employee';
import { AuthService } from './auth.service';
import { Request } from '../Models/request';

@Injectable()
export class RequestService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  url: String = 'http://4.156.40.62:9001/';

  private getHeaders() {
    return this.authService.getHeaders();
  }

  getAllRequests() {
    return this.http.get(this.url + 'request', { observe: 'response' });
  }

  getRequestById(id: string) {
    return this.http.get(this.url + 'request/' + id, { headers: this.getHeaders(), observe: 'response' });
  }

  createRequest(request: Request) {
    return this.http.post(this.url + 'request', request, { headers: this.getHeaders(), observe: 'response' });
  }

  updateRequest(request: Request) {
    return this.http.put(this.url + 'request/' + request.id, request, { headers: this.getHeaders(), observe: 'response' });
  }

  denyRequest(id: string) {
    return this.http.delete(this.url + 'request/' + id, { headers: this.getHeaders(), observe: 'response' });
  }

  approveRequest(id: string) {
    return this.http.put(this.url + 'request/' + id, { headers: this.getHeaders(), observe: 'response' });
  }

}
