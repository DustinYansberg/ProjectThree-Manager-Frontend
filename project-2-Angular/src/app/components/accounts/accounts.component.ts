import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent, MessageService, SelectItem, SortEvent } from 'primeng/api';
import { Table } from 'primeng/table';
import { timeout } from 'rxjs';
import { Email } from 'src/app/Models/email';
import { Employee } from 'src/app/Models/employee';
import { Name } from 'src/app/Models/name';
import { AccountService } from 'src/app/Services/account.service';

import { EmployeeService } from 'src/app/Services/employee.service';
import { Account } from '../../Models/account';
import { Meta } from '../../Models/meta';

@Component({
    templateUrl: './accounts.component.html',
    providers: [MessageService]
})
export class AccountsComponent implements OnInit {

    accounts: Account[] = [];

    employees: Employee[] = [];

    applications: any[] = [];

  defaultAccount = new Account("", "", "", true, "", [], [], "", "", "", new Meta(new Date(), new Date()));

    selectedAccounts: Account[] = [];

    accountDialog: boolean = false;

    deleteAccountDialog: boolean = false;

    deleteAccountsDialog: boolean = false;
    
    submitted: boolean = false;

    account: Account = this.defaultAccount;

    cols: any[];

    loading: boolean = false;

    constructor(private accountService: AccountService, private employeeService: EmployeeService, private messageService: MessageService) {}

    ngOnInit() {
        this.loading = true;
        this.accountService.getAllAccounts()
        .subscribe({
            next: (response) => {
                let body: any = response.body;

                console.log(body.Resources);

                body.Resources.forEach((resource: any) => {
                    if (!resource.applicationDisplayName) {
                        resource.applicationDisplayName = resource.application.displayName;
                    }
                });

                this.accounts = body.Resources.filter((resource: any) => resource.active);

                this.cols = [
                    { field: 'displayName', header: 'displayName' },
                    { field: 'id', header: 'id' },
                    { field: 'applicationDisplayName', header: 'applicationDisplayName' },
                    { field: 'active', header: 'active' }
                ];

                this.loading = false;
            },
            error: (err) => {
                this.loading = false;
                this.messageService.add({ severity: 'error', summary: 'Error', detail: err.message, life: 3000 });
            }
        });
        this.employeeService.getAllEmployees()
        .pipe(timeout(20000)) // 20 seconds timeout
        .subscribe({
          next: (response) => {
                console.log(response);
                let body: any = response.body;

                this.employees = body;
            },
            error: (err) => {
                this.loading = false;
                this.messageService.add({ severity: 'error', summary: 'Error', detail: err.message, life: 3000 });
            }
        });

        this.applications = [ { label: 'Salesforce', value: 'ac12000290eb1baf8190f0a73ef80926' } ];
    }

    customSort(event: any) {
        event.data.sort((data1: any, data2: any) => {
            let value1 = this.resolveFieldData(data1, event.field);
            let value2 = this.resolveFieldData(data2, event.field);
            let result = null;

            if (typeof value1 === 'object' && value1 !== null) {
                value1 = value1.displayName;
            }

            if (typeof value2 === 'object' && value2 !== null) {
                value2 = value2.displayName;
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
        this.account = this.defaultAccount;
        this.submitted = false;
        this.accountDialog = true;
    }

    deleteSelectedAccounts() {
        this.deleteAccountsDialog = true;
    }

    deleteAccount(account: any) {
        this.deleteAccountDialog = true;
        this.account = { ...account };
    }

    confirmDeleteSelected() {
        this.deleteAccountsDialog = false;
        this.accounts = this.accounts.filter(val => !this.selectedAccounts.includes(val));
        for (let i = 0; i < this.selectedAccounts.length; i++) {
            this.accountService.deleteAccount(this.selectedAccounts[i].accountId).subscribe({ next: (response) => {
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Account Deleted', life: 3000 });
            } });
        }
        this.selectedAccounts = [];
    }

    confirmDelete() {
        this.deleteAccountDialog = false;
        this.accountService.deleteAccount(this.account.accountId)
        .pipe(timeout(5000)) // 5 seconds timeout
        .subscribe({
            next: (response) => {
            console.log(response);
            this.accounts = this.accounts.filter(val => val.accountId !== this.account.accountId);
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Account Deleted', life: 3000 });
            },
            error: (err) => {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: err.message, life: 3000 });
            }
        });
        this.account = this.defaultAccount;
    }

    hideDialog() {
        event.preventDefault();
        this.accountDialog = false;
        this.submitted = false;
    }

    onSubmit(form: any) {
        this.submitted = true;

        if (form.valid) {
            this.saveAccount();
        }
    }

    saveAccount() {
        console.log(this.account);
        this.accountService.createAccount(this.account)
            .pipe(timeout(5000)) // 5 seconds timeout
            .subscribe({
                next: (response) => {
                    console.log(response);
                    this.account.accountId = response.body['id'];
                    this.accounts = [ ...this.accounts, this.account ];
                    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Account Created', life: 3000 });
                },
                error: (err) => {
                    if(err.status == 201) {
                        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Account Created', life: 3000 });
                    } else {
                        console.log(err);
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: "Unable to create account, check fields and try again", life: 3000 });
                    }
                }
            });

        this.accountDialog = false;
    }

    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.accounts.length; i++) {
            if (this.accounts[i].accountId === id) {
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
