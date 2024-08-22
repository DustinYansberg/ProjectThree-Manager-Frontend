import { Meta } from "./meta";

export class Account {

    accountDisplayName: string;
    accountId: string;
    accountAlias: string;
    isActive: boolean;
    applicationDisplayName: string;
    roles: string[];
    permissionSets: string[];
    communityNickname: string;
    jobTitle: string;
    email: string;
    meta: Meta;


    constructor(accountDisplayName: string, accountId: string, accountAlias: string, isActive: boolean, applicationDisplayName: string, roles: string[], permissionSets: string[], communityNickname: string, jobTitle: string, email: string, meta: Meta) {
      this.accountDisplayName = accountDisplayName;
      this.accountId = accountId;
      this.accountAlias = accountAlias;
      this.isActive = isActive;
      this.applicationDisplayName = applicationDisplayName;
      this.roles = roles;
      this.permissionSets = permissionSets;
      this.communityNickname = communityNickname;
      this.jobTitle = jobTitle;
      this.email = email;
      this.meta = meta;
    }

}
