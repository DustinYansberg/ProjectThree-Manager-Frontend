import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../Models/employee';
import { AuthService } from './auth.service';

@Injectable()
export class EmployeeService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  url: String = 'http://localhost:3000/';

  private getHeaders() {
    return this.authService.getHeaders();
  }

  getAllEmployees() {
    return this.http.get(this.url + 'api/users', { headers: this.getHeaders(), observe: 'response' });
  }

  getEmployeeById(id: string) {
    return this.http.get(this.url + 'api/users/' + id, { headers: this.getHeaders(), observe: 'response' });
  }

  createEmployee(employee: Employee) {
    return this.http.post(this.url + 'api/users', employee, { headers: this.getHeaders(), observe: 'response' });
  }

  updateEmployee(employee: Employee) {
    return this.http.put(this.url + 'api/users/' + employee.id, employee, { headers: this.getHeaders(), observe: 'response' });
  }

  deleteEmployee(id: string) {
    return this.http.delete(this.url + 'api/users/' + id, { headers: this.getHeaders(), observe: 'response' });
  }

}
