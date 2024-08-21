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

@Component({
		templateUrl: './requests.component.html',
		providers: [MessageService]
})
export class RequestsComponent implements OnInit {
		
		requests: Request[] = [];

  defaultRequest: Request = new Request("", new Employee("", "", new Name("", "", ""), "", "", false, "", [], new EmployeeDetail("", "", "", [], [], []), new Manager("", "", "")), new Role("", "", false), "");

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

		constructor(private requestService: RequestService, private messageService: MessageService) { }
		

		ngOnInit() {
				this.loading = true;
				this.requestService.getAllRequests()
				.subscribe({
						next: (response) => {
								console.log(response);
								let body: any = response.body;

								body.forEach((resource: Request) => {
										// Put additional logic here if needed
								});
								this.requests = body;

								this.cols = [
										{ field: 'username', header: 'Username' },
										{ field: 'role', header: 'Role' },
										{ field: 'note', header: 'Note' }
								];

								this.loading = false;
						},
						error: (err) => {
								console.log(err);
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

		denySelectedEmployees() {
				this.denyRequestsDialog = true;
    }

    approveSelectedEmployees() {
      this.approveRequestsDialog = true;
    }

		editRequest(request: Request) {
				this.request = { ...request };
				this.requestDialog = true;
		}

    denyRequest(request: Request) {
          this.denyRequestDialog = true;
				  this.request = { ...request };
     }

    approveRequest(request: Request) {
      this.approveRequestDialog = true;
      this.request = { ...request };
    }

    confirmDenySelected() {
				this.denyRequestDialog = false;
				this.requests = this.requests.filter(val => !this.selectedRequest.includes(val));
				for (let i = 0; i < this.selectedRequest.length; i++) {
						this.requestService.denyRequest(this.selectedRequest[i].id).subscribe({ next: (response) => {
								this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Request Denied', life: 3000 });
						} });
				}
				this.selectedRequest = [];
  }

    confirmApproveSelected() {
      this.approveRequestDialog = false;
      this.requests = this.requests.filter(val => !this.selectedRequest.includes(val));
      for (let i = 0; i < this.selectedRequest.length; i++) {
        this.requestService.approveRequest(this.selectedRequest[i].id).subscribe({
          next: (response) => {
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Request Approved', life: 3000 });
          }
        });
      }
      this.selectedRequest = [];
    }

		confirmDeny() {
				this.denyRequestDialog = false;
				this.requestService.denyRequest(this.request.id)
				.pipe(timeout(5000)) // 5 seconds timeout
				.subscribe({
						next: (response) => {
								this.requests = this.requests.filter(val => val.id !== this.request.id);
								this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Request Denied', life: 3000 });
						},
						error: (err) => {
								this.messageService.add({ severity: 'error', summary: 'Error', detail: err.message, life: 3000 });
						}
				});
				this.request = this.defaultRequest;
  }

    confirmApprove() {
      this.approveRequestDialog = false;
      this.requestService.approveRequest(this.request.id)
        .pipe(timeout(5000)) // 5 seconds timeout
        .subscribe({
          next: (response) => {
            this.requests = this.requests.filter(val => val.id !== this.request.id);
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Request Approved', life: 3000 });
          },
          error: (err) => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: err.message, life: 3000 });
          }
        });
      this.request = this.defaultRequest;
    }

		hideDialog() {
				this.requestDialog = false;
				this.submitted = false;
		}

		saveRequest() {
				this.submitted = true;
		
				if (this.request.id?.trim()) {
						if (this.request.id) {
								 this.requestService.updateRequest(this.request)
										.pipe(timeout(5000)) // 5 seconds timeout
										.subscribe({
												next: (response) => {
														console.log(response);
														this.request.id = response.body['id'];
														let index = this.findIndexById(this.request.id);
														this.requests[index] = this.request;
														this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Request Updated', life: 3000 });
												},
												error: (err) => {
														this.messageService.add({ severity: 'error', summary: 'Error', detail: "Unable to update request, check fields and try again", life: 3000 });
												}
										});
						} 
				}
				this.requestDialog = false;
		}

		findIndexById(id: string): number {
				let index = -1;
				for (let i = 0; i < this.requests.length; i++) {
						if (this.requests[i].id === id) {
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
