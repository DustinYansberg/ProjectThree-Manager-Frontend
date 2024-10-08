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
import { UserService } from '../../Services/user.service';

@Component({
    templateUrl: './accounts.component.html',
    providers: [MessageService]
})
export class AccountsComponent implements OnInit {

    accounts: Account[] = [];

  employees: any[] = [];

  fullEmployees: any[] = [];

  tempEmployee: Employee;

    totalRecords: number = 0;

    applications: any[] = [];

  defaultAccount = new Account("", "ac12000290eb1baf8190f0a73ef80926", "", "", "", "Salesforce", "", "", "", "", "", "", true, false);

    selectedAccounts: Account[] = [];

    accountDialog: boolean = false;

    deleteAccountDialog: boolean = false;

    deleteAccountsDialog: boolean = false;
    
    submitted: boolean = false;

    account: Account = this.defaultAccount;

    cols: any[];

    loading: boolean = false;

    identityId: string = "";

  constructor(private accountService: AccountService, private employeeService: EmployeeService, private userService: UserService, private messageService: MessageService) {
    this.userService.idObservable.subscribe(id => {
      this.identityId = id
    });
    console.log(this.identityId);
  }

    ngOnInit() {
      this.loading = true;
      // add own id
      this.employeeService.getByManager(this.identityId)
        .pipe(timeout(20000)) // 20 seconds timeout
        .subscribe({
          next: (response) => {
            let body: any = response.body;
            this.fullEmployees = body.Resources;

            body.Resources.forEach((resource: Employee) => {
              this.employees.push({ label: resource.displayName.slice(0, 30).toString(), value: resource.id.toString() });

            });
            console.log(this.employees);
            this.loading = false;
          },
          error: (err) => {
            this.loading = false;
            this.messageService.add({ severity: 'error', summary: 'Error', detail: err.message, life: 3000 });
          }
        });

        this.applications = [
           { label: 'Salesforce', value: 'Salesforce' },
           { label: 'Appian', value: 'Appian' },
           { label: 'ZenDesk', value: 'ZenDesk' },
           { label: 'SailPoint', value: 'SailPoint' },
           { label: 'ServiceNow', value: 'ServiceNow' },
           { label: 'EasyPics', value: 'EasyPics' }
         ];
  }

  getAccountsByIdentity(event: any) {
    this.loading = true;
    this.accounts = [];


    this.accountService.getAccountById(event.value).subscribe(
      {
        next: (response) => {
          console.log(response)
          let body: any = response.body;
          body.forEach((resource: any) => {
            if (resource.isActive == "true") {
              this.accounts.push(resource);
            }
          });
          this.loading = false;
          console.log(this.accounts);
        },
        error: (err) => {
          console.log(err)
          this.loading = false;
          this.messageService.add({ severity: 'error', summary: 'Error', detail: "Unable to fetch Accounts, try again", life: 3000 });
        }
      }

    );
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
          this.accountService.deleteAccount(this.selectedAccounts[i].accountAppId).subscribe({ next: (response) => {
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Account Deleted', life: 3000 });
            } });
        }
        this.selectedAccounts = [];
    }

    confirmDelete() {
      this.deleteAccountDialog = false;
      console.log(this.account);
      this.accountService.deleteAccount(this.account.accountId)
        .pipe(timeout(5000)) // 5 seconds timeout
        .subscribe({
            next: (response) => {
            console.log(response);
            this.accounts = this.accounts.filter(val => val.accountAppId !== this.account.accountAppId);
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
    this.tempEmployee = this.fullEmployees.filter(employee => employee.id === this.account.userId)[0];
    this.account.firstName = this.tempEmployee.name.givenName;
    this.account.lastName = this.tempEmployee.name.familyName;
    this.account.accountDisplayName = this.account.username;
    this.account.email = this.account.username;
      console.log(this.account);
        this.accountService.createAccount(this.account)
            .pipe(timeout(5000)) // 5 seconds timeout
            .subscribe({
                next: (response) => {
                    console.log(response);
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
          if (this.accounts[i].accountAppId === id) {
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
