// displayName : string
        // value : string
        // $ref : string

export class Manager {

    jobTitle: string;
    isManager: boolean;
    department: string;

    constructor(jobTitle: string, isManager: boolean, department: string) {
        this.jobTitle = jobTitle;
        this.isManager = isManager;
        this.department = department;
    }

}