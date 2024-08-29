import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent, MessageService, SelectItem, SortEvent } from 'primeng/api';
import { Table } from 'primeng/table';
import { timeout } from 'rxjs';
import { Email } from 'src/app/Models/email';
import { Employee } from 'src/app/Models/employee';
import { EmployeeDetail } from 'src/app/Models/employeeDetail';
import { Manager } from 'src/app/Models/manager';
import { Name } from 'src/app/Models/name';

import { EmployeeService } from 'src/app/Services/employee.service';
import { UserService } from 'src/app/Services/user.service';
import { UpdateEmployee } from '../../Models/updateEmployee';
import { CreateEmployee } from '../../Models/createEmployee';

@Component({
    templateUrl: './employees.component.html',
    providers: [MessageService]
})
export class EmployeesComponent implements OnInit {

    employees: any[] = [];
    
    defaultEmployee: Employee = new Employee("", "", new Name("", "", ""), "", "employee", false, "", [new Email("", "", true)], new EmployeeDetail("", "", "", [], [], []), new Manager("", "", ""));

    selectedEmployees: Employee[] = [];

    totalRecords: number = 100;

    employeeDialog: boolean = false;

    deleteEmployeeDialog: boolean = false;

    deleteEmployeesDialog: boolean = false;
    
    submitted: boolean = false;

    employee: Employee = this.defaultEmployee;

    cols: any[];
    updateEmployee: UpdateEmployee;

    createEmployee: CreateEmployee;

    loading: boolean = false;

    creatingEmployee: boolean;

    passwordFieldType: string = 'password';

    identityId: string;

    constructor(private employeeService: EmployeeService, private messageService: MessageService, private userService: UserService) 
    {
        
    }

    ngOnInit() {
      this.loading = true;

      this.userService.getEmployeeId().subscribe(data => {
        this.userService.idSubject.next(data.body.id);
            this.userService.idObservable.subscribe(id => {
                this.identityId = id;

                this.employeeService.getByManager(this.identityId)
          .subscribe({
              next: (response) => {
              console.log(response);
                  this.totalRecords = response.body["totalResults"];
                  let body: any = response.body["Resources"];

                  body.forEach((resource: Employee) => {
                      if (!resource.emails || !resource.emails[0] || !resource.emails[0].value) {
                          resource.emails = [new Email("", " ", true)];
                      }
                  });
                  this.employees = body;

                  this.cols = [
                      { field: 'userName', header: 'Username' },
                      { field: 'displayName', header: 'Display Name' },
                      { field: 'emails', header: 'Email' },
                  ];

                  this.loading = false;
              },
              error: (err) => {
                  console.log(err);
                  this.loading = false;
                  this.messageService.add({ severity: 'error', summary: 'Error', detail: err.message, life: 3000 });
              }
          });
            });
            console.log(this.identityId);
        });

        
        
  }

    //loadEmployees($event: LazyLoadEvent) {
    //  this.loading = true;
    //  this.employeeService.getAllEmployees($event.first || 0, $event.rows)
    //    .subscribe({
    //      next: (response) => {
    //        console.log(response);
    //        this.totalRecords = response.body["totalResults"];
    //        let body: any = response.body["Resources"];

    //        body.forEach((resource: Employee) => {
    //          if (!resource.emails || !resource.emails[0] || !resource.emails[0].value) {
    //            resource.emails = [new Email("", " ", true)];
    //          }
    //        });
    //        this.employees = body;

    //        this.cols = [
    //          { field: 'userName', header: 'Username' },
    //          { field: 'displayName', header: 'Display Name' },
    //          { field: 'emails', header: 'Email' },
    //        ];

    //        this.loading = false;
    //      },
    //      error: (err) => {
    //        console.log(err);
    //        this.loading = false;
    //        this.messageService.add({ severity: 'error', summary: 'Error', detail: err.message, life: 3000 });
    //      }
    //    });
    //}

    customSort(event: any) {
        event.data.sort((data1: any, data2: any) => {
            let value1 = this.resolveFieldData(data1, event.field);
            let value2 = this.resolveFieldData(data2, event.field);
            let result = null;

            // Check if value1 and value2 are objects and pull out their 'value' property
            if (typeof value1 === 'object' && value1 !== null) {
                value1 = value1[0].value;
            }
            if (typeof value2 === 'object' && value2 !== null) {
                value2 = value2[0].value;
            }
    
            if (value1 == null && value2 != null)
                result = -1;
            else if (value1 != null && value2 == null)
                result = 1;
            else if (value1 == null && value2 == null)
                result = 0;
            else if (typeof value1 === 'string' && typeof value2 === 'string')
                result = value1.localeCompare(value2);
            else
                result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;
    
            return (event.order * result);
        });
    }

    resolveFieldData(data: any, field: string): any {
        if (data && field) {
            let fields = field.split('.');
            let value = data;
            for (let i = 0; i < fields.length; i++) {
                if (value == null) {
                    return null;
                }
                value = value[fields[i]];
            }
            return value;
        } else {
            return null;
        }
    }

    openNew() {
        this.employee = this.defaultEmployee;
        this.submitted = false;
        this.employeeDialog = true;
        this.creatingEmployee = true;
    }

    deleteSelectedEmployees() {
        this.deleteEmployeesDialog = true;
    }

    editEmployee(employee: Employee) {
        this.employee = { ...employee };
        this.employeeDialog = true;
        this.creatingEmployee = false;
    }

    deleteEmployee(employee: Employee) {
        this.deleteEmployeeDialog = true;
        this.employee = { ...employee };
    }

    confirmDeleteSelected() {
        this.deleteEmployeesDialog = false;
        this.employees = this.employees.filter(val => !this.selectedEmployees.includes(val));
        for (let i = 0; i < this.selectedEmployees.length; i++) {
            this.employeeService.deleteEmployee(this.selectedEmployees[i].id).subscribe({ next: (response) => {
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Employee Deleted', life: 3000 });
            } });
        }
        this.selectedEmployees = [];
    }

    confirmDelete() {
        this.deleteEmployeeDialog = false;
        this.employeeService.deleteEmployee(this.employee.id)
        .pipe(timeout(5000)) // 5 seconds timeout
        .subscribe({
            next: (response) => {
                this.employees = this.employees.filter(val => val.id !== this.employee.id);
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Employee Deleted', life: 3000 });
            },
            error: (err) => {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: err.message, life: 3000 });
            }
        });
        this.employee = this.defaultEmployee;
    }

    hideDialog() {
        this.employeeDialog = false;
        this.submitted = false;
        this.creatingEmployee = false;
    }

    saveEmployee() {
      this.submitted = true;
    
      if (this.employee.userName?.trim()) {
        if (!this.creatingEmployee) {
          console.log(this.employee);
          this.updateEmployee = new UpdateEmployee(this.employee.name.givenName, this.employee.name.familyName, this.employee.displayName, this.employee.emails[0].value, this.employee.password);
            this.employeeService.updateEmployee(this.employee.id, this.updateEmployee)
                    .pipe(timeout(5000)) // 5 seconds timeout
                    .subscribe({
                        next: (response) => {
                            console.log(response);
                            this.employee.id = response.body['id'];
                            let index = this.findIndexById(this.employee.id);
                            this.employees[index] = this.employee;
                            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Employee Updated', life: 3000 });
                        },
                        error: (err) => {
                            this.messageService.add({ severity: 'error', summary: 'Error', detail: "Unable to update employee, check fields and try again", life: 3000 });
                        }
                    });
        } else if (this.creatingEmployee) {
          this.employee.manager.value = this.identityId;
          this.createEmployee = new CreateEmployee(this.employee.userName, this.employee.password, this.employee.name.givenName, this.employee.name.familyName, this.employee.emails[0].value, this.employee.manager.value, "", "", this.employee.displayName, this.employee.active, this.employee.userType, "");
          console.log(this.createEmployee);
          this.employeeService.createEmployee(this.createEmployee)
                    .pipe(timeout(5000)) // 5 seconds timeout
                    .subscribe({
                        next: (response) => {
                            console.log(response);
                            this.employee.id = response.body['id'];
                            this.employees = [ ...this.employees, this.employee ];
                            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Employee Created', life: 3000 });
                        },
                        error: (err) => {
                            this.messageService.add({ severity: 'error', summary: 'Error', detail: "Unable to create employee, check fields and try again", life: 3000 });
                        }
                    });
            }

        this.employeeDialog = false;
        this.creatingEmployee = false;
        }
    }

    togglePasswordVisibility() {
        this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
      }

    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.employees.length; i++) {
            if (this.employees[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

  //paginate(event) {
  //  this.loading = true;
  //  this.employees = null;
  //  this.employeeService.getAllEmployees(event.first, event.rows)
  //    .subscribe({
  //      next: (response) => {
  //        console.log(response);
  //        let body: any = response.body;

  //        body.forEach((resource: Employee) => {
  //          if (!resource.emails || !resource.emails[0] || !resource.emails[0].value) {
  //            resource.emails = [new Email("", " ", true)];
  //          }
  //        });
  //        this.employees = body;

  //        this.cols = [
  //          { field: 'userName', header: 'Username' },
  //          { field: 'displayName', header: 'Display Name' },
  //          { field: 'emails', header: 'Email' },
  //        ];

  //        this.loading = false;
  //      },
  //      error: (err) => {
  //        console.log(err);
  //        this.loading = false;
  //        this.messageService.add({ severity: 'error', summary: 'Error', detail: err.message, life: 3000 });
  //      }
  //    });

  //    //event.first = Index of the first record
  //    //event.rows = Number of rows to display in new page
  //    //event.page = Index of the new page
  //    //event.pageCount = Total number of pages
  //  }
    
}
