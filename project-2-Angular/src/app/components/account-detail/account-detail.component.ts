import { AccountDetail } from 'src/app/Models/accountDetails';
import { Meta } from 'src/app/Models/meta';
import { AccountService } from 'src/app/Services/account.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
    templateUrl: './account-detail.component.html',
    providers: [MessageService]
})
export class AccountDetailComponent implements OnInit {

    accountDetails: AccountDetail;

    constructor(private AccountService: AccountService, private messageService: MessageService, private route: ActivatedRoute, private router: Router) {}

    ngOnInit() {
        this.AccountService.getAccountById(this.route.snapshot.params['id'])
        .subscribe({
            next: (response) => {
                let accountResponse: any = response.body;
        
                let accountAlias = 'N/A';
                let roles = ['N/A'];
                let permissionSet = ['N/A'];
                let communityNickname = 'N/A';
                let jobTitle = 'N/A';
                let email = 'N/A';
        
                if (accountResponse.application.displayName === 'Azure Entra ID') {
                    roles = accountResponse["urn:ietf:params:scim:schemas:sailpoint:1.0:Application:Schema:Azure Entra ID:account"].roles || ['N/A'];
                    if (roles.length === 0) {
                        roles = ['N/A'];
                    }
                    jobTitle = accountResponse["urn:ietf:params:scim:schemas:sailpoint:1.0:Application:Schema:Azure Entra ID:account"].jobTitle || 'N/A';
                } else if (accountResponse.application.displayName === 'Salesforce') {
                    accountAlias = accountResponse["urn:ietf:params:scim:schemas:sailpoint:1.0:Application:Schema:Salesforce:account"].Alias || 'N/A';
                    communityNickname = accountResponse["urn:ietf:params:scim:schemas:sailpoint:1.0:Application:Schema:Salesforce:account"].CommunityNickname || 'N/A';
                    permissionSet = accountResponse["urn:ietf:params:scim:schemas:sailpoint:1.0:Application:Schema:Salesforce:account"].PermissionSet || ['N/A'];
                    if (permissionSet.length === 0) {
                        permissionSet = ['N/A'];
                    }
                    email = accountResponse["urn:ietf:params:scim:schemas:sailpoint:1.0:Application:Schema:Salesforce:account"].Email || 'N/A';
                }
        
                this.accountDetails = new AccountDetail(
                    accountResponse.application.displayName || 'N/A',
                    accountResponse.id || 'N/A',
                    accountResponse.displayName || 'N/A',
                    accountAlias,
                    accountResponse.active || false,
                    roles,
                    permissionSet,
                    communityNickname,
                    jobTitle,
                    email,
                    new Meta(
                        new Date(accountResponse.meta.created),
                        new Date(accountResponse.meta.lastModified)
                    )
                );
    

            },
            error: (err) => {
                console.log(err)
                this.messageService.add({ severity: 'error', summary: 'Error', detail: err.message, life: 3000 });
                this.router.navigate(['/notfound']);
            }
        });
    }
}