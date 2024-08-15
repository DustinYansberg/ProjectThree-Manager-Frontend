import { Meta } from './meta';

export class AccountDetail {
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

  constructor(
    applicationDisplayName: string,
    accountId: string,
    accountDisplayName: string,
    accountAlias: string,
    isActive: boolean,
    roles: string[],
    permissionSets: string[],
    communityNickname: string,
    jobTitle: string,
    email: string,
    meta: Meta
  ) {
    this.applicationDisplayName = applicationDisplayName;
    this.accountId = accountId;
    this.accountDisplayName = accountDisplayName;
    this.accountAlias = accountAlias;
    this.isActive = isActive;
    this.roles = roles;
    this.permissionSets = permissionSets;
    this.communityNickname = communityNickname;
    this.jobTitle = jobTitle;
    this.email = email;
    this.meta = meta;
  }
}
