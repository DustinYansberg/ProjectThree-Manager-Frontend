// displayName : string
        // value : string
        // $ref : string

import { Account } from "./account";
import { Entitlement } from "./entitlement";
import { Role } from "./role";

export class EmployeeDetail {

    displayName: string;
    value: string;
    $ref: string;
    accounts: Account[];
    roles: Role[];
    entitlements: Entitlement[];

    constructor(displayName: string, value: string, $ref: string, accounts: Account[], roles: Role[], entitlements: Entitlement[]) {
        this.displayName = displayName;
        this.value = value;
        this.$ref = $ref;
        this.accounts = accounts;
        this.roles = roles;
        this.entitlements = entitlements;
    }

}