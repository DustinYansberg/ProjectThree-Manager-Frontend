import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent, MessageService, SelectItem, SortEvent } from 'primeng/api';
import { Table } from 'primeng/table';
import { timeout } from 'rxjs';
import { Email } from 'src/app/Models/email';
import { Employee } from 'src/app/Models/employee';
import { Name } from 'src/app/Models/name';

import { EmployeeService } from 'src/app/Services/employee.service';

@Component({
    templateUrl: './employees.component.html',
    providers: [MessageService]
})
export class EmployeesComponent implements OnInit {

    employees: any[] = [];
    
    defaultEmployee: Employee = new Employee( '', '', new Name("", "", ""), '', 'employee', false, '', [new Email("", "", true)], '');

    selectedEmployees: Employee[] = [];

    employeeDialog: boolean = false;

    deleteEmployeeDialog: boolean = false;

    deleteEmployeesDialog: boolean = false;
    
    submitted: boolean = false;

    employee: Employee = this.defaultEmployee;

    cols: any[];

    loading: boolean = false;

    creatingEmployee: boolean;

    passwordFieldType: string = 'password';

    constructor(private employeeService: EmployeeService, private messageService: MessageService) {}

    ngOnInit() {
        this.loading = true;
        this.employeeService.getAllEmployees()
        .pipe(timeout(20000)) // 20 seconds timeout
        .subscribe({
            next: (response) => {
                let body: any = response.body;

                body.Resources.forEach((resource: Employee) => {
                    if (!resource.emails || !resource.emails[0] || !resource.emails[0].value) {
                        resource.emails = [new Email("", " ", true)];
                    }

                    if (!resource.managerDisplayName) {
                        console.log(resource["urn:ietf:params:scim:schemas:extension:enterprise:2.0:User"].manager.displayName);
                        if (resource["urn:ietf:params:scim:schemas:extension:enterprise:2.0:User"].manager.displayName) {
                            resource.managerDisplayName = resource["urn:ietf:params:scim:schemas:extension:enterprise:2.0:User"].manager.displayName;
                        } else {
                            resource.managerDisplayName = " ";
                        }
                    }
                });
                console.log(body.Resources);
                this.employees = body.Resources;

                this.cols = [
                    { field: 'displayName', header: 'Display Name' },
                    { field: 'emails', header: 'Email' },
                    { field: 'urn:ietf:params:scim:schemas:extension:enterprise:2.0:User.manager.displayName', header: 'Manager' }
                ];

                this.loading = false;
            },
            error: (err) => {
                this.loading = false;
                this.messageService.add({ severity: 'error', summary: 'Error', detail: err.message, life: 3000 });
            }
        });
    }

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
            if (this.employee.id) {
                this.employeeService.updateEmployee(this.employee)
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
                this.employeeService.createEmployee(this.employee)
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
    
}
