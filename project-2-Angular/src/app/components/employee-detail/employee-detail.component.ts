import { Email } from 'src/app/Models/email';
import { EmployeeDetail } from 'src/app/Models/employeeDetail';
import { EmployeeService } from 'src/app/Services/employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Employee } from 'src/app/Models/employee';
import { Manager } from 'src/app/Models/manager';

@Component({
    templateUrl: './employee-detail.component.html',
    providers: [MessageService]
})
export class EmployeeDetailComponent implements OnInit {

    employee: Employee;

    primaryEmail: string;

    constructor(private employeeService: EmployeeService, private messageService: MessageService, private route: ActivatedRoute, private router: Router) {}

    ngOnInit() {
        this.employeeService.getEmployeeById(this.route.snapshot.params['id'])
        .subscribe({
            next: (response) => {
                let employeeResponse: any = response.body;
                console.log(employeeResponse)
                if (!employeeResponse.emails || !employeeResponse.emails[0] || !employeeResponse.emails[0].value) {
                    employeeResponse.emails = [new Email("", " ", true)];
                }
                if (!employeeResponse.manager || !employeeResponse.manager.displayName) {
                    employeeResponse.manager = new Manager("N/A", "N/A", "N/A");
                }
                this.employee = new Employee(
                    employeeResponse.id,
                    employeeResponse.userName,
                    employeeResponse.name,
                    employeeResponse.displayName,
                    employeeResponse.userType,
                    employeeResponse.active,
                    employeeResponse.password,
                    employeeResponse.emails,
                    employeeResponse.employeeDetails,
                    employeeResponse.manager
                );
                console.log(this.employee)

            },
            error: (err) => {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: err.message, life: 3000 });
                this.router.navigate(['/notfound']);
            }
        });
    }
}