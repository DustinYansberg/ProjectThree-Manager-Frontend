import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../Models/employee';
import { AuthService } from './auth.service';

@Injectable()
export class RequestService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  url: String = 'http://4.156.40.62:9001/';

  private getHeaders() {
    return this.authService.getHeaders();
  }

  getAllEmployees() {
    return this.http.get(this.url + 'employee', { observe: 'response' });
  }

  getEmployeeById(id: string) {
    return this.http.get(this.url + 'employee/' + id, { headers: this.getHeaders(), observe: 'response' });
  }

  createEmployee(employee: Employee) {
    return this.http.post(this.url + 'employee', employee, { headers: this.getHeaders(), observe: 'response' });
  }

  updateEmployee(employee: Employee) {
    return this.http.put(this.url + 'employee/' + employee.id, employee, { headers: this.getHeaders(), observe: 'response' });
  }

  deleteEmployee(id: string) {
    return this.http.delete(this.url + 'employee/' + id, { headers: this.getHeaders(), observe: 'response' });
  }

}
