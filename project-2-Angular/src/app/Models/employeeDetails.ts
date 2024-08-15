import { Meta } from './meta';

export class EmployeeDetail {
    id: string;
    userName: string;
    displayName: string;
    active: boolean;
    email: string;
    meta: Meta;
    isManager: boolean;
    riskScore: number;
    managerDisplayName: string;

    constructor(
        id: string,
        userName: string,
        displayName: string,
        active: boolean,
        email: string,
        meta: Meta,
        isManager: boolean,
        riskScore: number,
        managerDisplayName: string
    ) {
        this.id = id;
        this.userName = userName;
        this.displayName = displayName
        this.active = active;
        this.email = email;
        this.meta = meta;
        this.isManager = isManager;
        this.riskScore = riskScore;
        this.managerDisplayName = managerDisplayName;
    }
}
