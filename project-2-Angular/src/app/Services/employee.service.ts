import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../Models/employee';

@Injectable()
export class EmployeeService {

  private url: string = 'http://localhost:3000/';

  constructor(private http: HttpClient) { }

  getAllEmployees() {
    return this.http.get(this.url + 'api/users', { observe: 'response' });
  }

  getEmployeeById(id: string) {
    return this.http.get(this.url + 'api/users/' + id, { observe: 'response' });
  }

  createEmployee(employee: Employee) {
    return this.http.post(this.url + 'api/users', employee, { observe: 'response' });
  }

  updateEmployee(employee: Employee) {
    return this.http.put(this.url + 'api/users/' + employee.id, employee, { observe: 'response' });
  }

  deleteEmployee(id: string) {
    return this.http.delete(this.url + 'api/users/' + id, { observe: 'response' });
  }

}
