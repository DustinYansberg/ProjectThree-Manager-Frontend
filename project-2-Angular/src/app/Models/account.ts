import { Meta } from "./meta";

export class Account {

  userId: string;
  accountAppId: string;
  accountId: string;
  nativeIdentity: string;
  accountDisplayName: string;
  appName: string;
  username: string;
  lastName: string;
  firstName: string;
  communityNickname: string;
  accountAlias: string;
  email: string;
  active: boolean;
  locked: boolean;


  constructor(userId: string, accountAppId: string, accountId: string, nativeIdentity: string, accountDisplayName: string, appName: string, username: string, lastName: string, firstName: string, communityNickname: string, accountAlias: string, email: string, active: boolean, locked: boolean) {
    this.userId = userId;
    this.accountAppId = accountAppId;
    this.accountId = accountId;
    this.nativeIdentity = nativeIdentity;
    this.accountDisplayName = accountDisplayName;
    this.appName = appName;
    this.username = username;
    this.lastName = lastName;
    this.firstName = firstName;
    this.communityNickname = communityNickname;
    this.accountAlias = accountAlias;
    this.email = email;
    this.active = active;
    this.locked = locked;
  };

}
