import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../Models/employee';
import { UpdateEmployee } from '../Models/updateEmployee';

@Injectable()
export class EmployeeService {

  constructor(private http: HttpClient) { }

  //url: String = 'http://4.156.40.62:9001/';
   url: String = 'http://localhost:8081/';

  
  
  getByManager(id: string){
    return this.http.get(this.url + "employee/manager" + "/" + id, { observe: 'response'});
  }

  getAllEmployees(index: number, row: number) {
    return this.http.get(this.url + 'employee/page/' + index + "/" + row, { observe: 'response' });
  }

  getEmployeeById(id: string) {
    return this.http.get(this.url + 'employee/' + id, { observe: 'response' });
  }

  createEmployee(employee: Employee) {
    return this.http.post(this.url + 'employee', employee, { observe: 'response' });
  }

  updateEmployee(id: string ,updateEmployee: UpdateEmployee) {
    return this.http.put(this.url + 'employee/' + id, updateEmployee, { observe: 'response' });
  }

  deleteEmployee(id: string) {
    return this.http.delete(this.url + 'employee/' + id, { observe: 'response' });
  }

}
