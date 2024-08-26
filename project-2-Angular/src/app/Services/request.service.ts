import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Request } from '../Models/request';

@Injectable()
export class RequestService {

  constructor(private http: HttpClient) { }

  url: String = 'http://4.156.40.62:9001/';

  getAllRequests() {
    return this.http.get(this.url + 'request', { observe: 'response' });
  }

  getRequestById(id: string) {
    return this.http.get(this.url + 'request/' + id, { observe: 'response' });
  }

  createRequest(request: Request) {
    return this.http.post(this.url + 'request', request, { observe: 'response' });
  }

  updateRequest(request: Request) {
    return this.http.put(this.url + 'request/' + request.id, request, { observe: 'response' });
  }

  denyRequest(id: string) {
    return this.http.delete(this.url + 'request/' + id, { observe: 'response' });
  }

  approveRequest(id: string) {
    return this.http.put(this.url + 'request/' + id, { observe: 'response' });
  }

}
