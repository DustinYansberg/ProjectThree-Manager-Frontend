import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { timeout } from 'rxjs';
import { Email } from 'src/app/Models/email';
import { Employee } from 'src/app/Models/employee';
import { EmployeeDetail } from 'src/app/Models/employeeDetail';
import { Manager } from 'src/app/Models/manager';
import { Name } from 'src/app/Models/name';

import { RequestService } from 'src/app/Services/request.service';
import { Request } from '../../Models/request';
import { Role } from '../../Models/role';
import { UserService } from 'src/app/Services/user.service';
import { EmployeeService } from 'src/app/Services/employee.service';
import { Entitlement } from 'src/app/Models/entitlement';

@Component({
  templateUrl: './requests.component.html',
  providers: [MessageService],
})
export class RequestsComponent implements OnInit {
  requests: Request[] = [];

  processedRequests: Request[] = [];

  entitlements: Entitlement[] = [];

  employees: any[] = [];

  entitlement: Entitlement = new Entitlement('','','','');

  possibleRequests: Request[] = [];

  defaultRequest: Request = new Request('', '', '', '', false, false, '');

  selectedRequest: Request[] = [];

  requestDialog: boolean = false;

  denyRequestDialog: boolean = false;

  denyRequestsDialog: boolean = false;

  approveRequestDialog: boolean = false;

  approveRequestsDialog: boolean = false;

  submitted: boolean = false;

  request: Request = this.defaultRequest;

  cols: any[];

  loading: boolean = false;

  // accounts: string[] = [
	// "Zendesk",
	// "Salesforce",
	// "Appian",
	// "SailPoint",
	// "ServiceNow",
	// "Custom",
  // ] ;

  employee: Employee;

  //get from gianni
  employeeApps: string[] = [
	"Zendesk",
	"Appian",
  "Salesforce"
  ];
  pagingEntitlements: any[] = [];

  identityId: string;

  manId: string;

  choice: boolean = false;



  //add user service to get the logged user
  constructor(
    private requestService: RequestService,
    private messageService: MessageService,
    private userService: UserService,
    private employeeSerivce: EmployeeService
  ) {
	this.userService.idObservable.subscribe(id => {
	this.identityId = id});
	console.log(this.identityId)
  }

  ngOnInit() {
    this.loading = true;
    this.requests;
    this.possibleRequests;
    this.entitlements;

    this.employeeSerivce.getByManager(this.identityId)
      .pipe(timeout(20000)) // 20 seconds timeout
      .subscribe({
        next: (response) => {
          let body: any = response.body;

          body.Resources.forEach((resource: Employee) => {
            this.employees.push({ label: resource.displayName.slice(0, 30).toString(), value: resource.id.toString() });
          });

          this.requestService.getByManagerAndStatus(this.identityId, false).subscribe({
            next: (response) => {
              let body: any = response.body;
              body.forEach((element: any) => {
                if (element) {
                  element.displayName = this.employees.find((employee) => employee.value === element.requesterId).label;
                  this.requests.push(element);
                }
              });
              this.loading = false;
            },
            error: (err) => {
              console.error('Error fetching requests:', err);
              this.loading = false;
            }
          });

          this.requestService.getByManagerAndStatus(this.identityId, true).subscribe({
            next: (response) => {
              let body: any = response.body;
              body.forEach((element: any) => {
                if (element) {
                  element.displayName = this.employees.find((employee) => employee.value === element.requesterId).label;
                  this.processedRequests.push(element);

                }
              });
              this.loading = false;
            },
            error: (err) => {
              console.error('Error fetching requests:', err);
              this.loading = false;
            }
          });
        },
        error: (err) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: err.message, life: 3000 });
        }
      });
	
		  
    
		
  }

  
  processRequest(request: Request, choice : boolean)  {

		this.request = request; 
    console.log(this.request);
		  this.requestService.processRequest(this.request.requesterId, this.request.entitlementId, choice, this.request.requestId)
		  .subscribe({
			next: (response) => {
			  this.loading = false;
        	  this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Request Processed', life: 3000 });
			  this.requests = this.requests.filter(val => val.requestId !== this.request.requestId);
			  this.processedRequests.push(request);
			},
			error: (err) => {
			  console.error('Error fetching requests:', err);
			  this.loading = false;
			}
		  });
      this.requestDialog = false;
	  
		 
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

      if (value1 == null && value2 != null) result = -1;
      else if (value1 != null && value2 == null) result = 1;
      else if (value1 == null && value2 == null) result = 0;
      else if (typeof value1 === 'string' && typeof value2 === 'string')
        result = value1.localeCompare(value2);
      else result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;

      return event.order * result;
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




  openNew(value: any) {
    this.entitlement.name =  value.displayableName;
    this.entitlement.application =  value.applicationDisplayName;
    this.submitted = false;
    this.requestDialog = true;
  }

  hideDialog() {
    this.requestDialog = false;
    this.submitted = false;
  }


  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.requests.length; i++) {
      if (this.requests[i].entitlementId === id) {
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
