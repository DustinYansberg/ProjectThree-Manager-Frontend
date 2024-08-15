import { Email } from 'src/app/Models/email';
import { Meta } from 'src/app/Models/meta';
import { EmployeeDetail } from 'src/app/Models/employeeDetails';
import { EmployeeService } from 'src/app/Services/employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
    templateUrl: './employee-detail.component.html',
    providers: [MessageService]
})
export class EmployeeDetailComponent implements OnInit {

    employeeDetails: EmployeeDetail;

    primaryEmail: string;

    constructor(private employeeService: EmployeeService, private messageService: MessageService, private route: ActivatedRoute, private router: Router) {}

    ngOnInit() {
        this.employeeService.getEmployeeById(this.route.snapshot.params['id'])
        .subscribe({
            next: (response) => {
                let employeeResponse: any = response.body;
                console.log(employeeResponse)
                this.employeeDetails = new EmployeeDetail(
                    employeeResponse.id || '',
                    employeeResponse.userName || '',
                    employeeResponse.displayName || '',
                    employeeResponse.active || false,
                    employeeResponse.emails[0].value ? employeeResponse.emails[0].value : 'N/A',
                    new Meta(
                        new Date(employeeResponse.meta.created),
                        new Date(employeeResponse.meta.lastModified),
                    ),
                    employeeResponse.isManager || false,
                    employeeResponse.riskScore || 0,
                    employeeResponse["urn:ietf:params:scim:schemas:extension:enterprise:2.0:User"].manager.displayName || 'N/A'
                );

            },
            error: (err) => {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: err.message, life: 3000 });
                this.router.navigate(['/notfound']);
            }
        });
    }
}