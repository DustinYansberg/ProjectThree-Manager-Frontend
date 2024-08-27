import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../Models/employee';
import { AuthService } from './auth.service';
import { Request } from '../Models/request';

@Injectable()
export class RequestService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  // url: String = 'http://4.156.40.62:9001/entitlements/';
  url: String = 'http://localhost:8081/entitlements/';

  private getHeaders() {
    return this.authService.getHeaders();
  }

  getByApp(app: string) {
    return this.http.get(this.url + 'getByApp/' + app, { observe: 'response' });
  }

  getByManager(managerId : string) {
    return this.http.get(this.url + 'getByOwner/' + managerId, { observe: 'response' });
  }

  getByManagerAndStatus(managerId: string, processed : boolean) {
    return this.http.get(this.url + 'getByManagerAndStatus/' + 
      managerId +"/"+ processed, { headers: this.getHeaders(), observe: 'response' });
  }

  createRequest(manId:string, entId:string, userId:string, description:string) {
    return this.http.post(this.url + 'request/'+ manId +"/"+ entId +"/"+
       userId +"/"+ description, { headers: this.getHeaders(), observe: 'response' });
  }

  processRequest(userId: string, entitlementId: string, choice: boolean) {
    return this.http.put(this.url + 'process/' + userId +"/"+ entitlementId +"/"+ choice, { headers: this.getHeaders(), observe: 'response' });
  }



}
