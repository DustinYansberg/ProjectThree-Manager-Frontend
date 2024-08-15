import { Name } from './name';
import { Email } from './email';

export class Employee {

    id: string;
    userName: string;
    name: Name;
    displayName: string;
    userType: string;
    active: boolean;
    password: string;
    emails: Email[];
    managerDisplayName: string;


    constructor(id: string, userName: string, name: Name, displayName: string, userType: string, active: boolean, password: string, emails: Email[], managerDisplayName: string) {
        this.id = id;
        this.userName = userName;
        this.name = name;
        this.displayName = displayName;
        this.userType = userType;
        this.active = active;
        this.password = password;
        this.emails = emails;
        this.managerDisplayName = managerDisplayName;
    }

}
