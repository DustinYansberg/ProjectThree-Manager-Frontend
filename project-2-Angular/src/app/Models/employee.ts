import { Email } from "./email";
import { EmployeeDetail } from "./employeeDetail";
import { Manager } from "./manager";
import { Name } from "./name";

export class Employee {

    id: string;
    userName: string;
    name: Name;
        // formatted
        // familyName
        // givenName
    displayName: string;
    userType: string;
    active: boolean;
    password: string;
    emails: Email[];
        // type : string
        // value : string
        // primary : boolean
    employeeDetails: EmployeeDetail; // TODO: Placeholder for EmployeeDetails Object
    /**
     *  accounts : array
         -- The accounts associated with this User.
        entitlements : array
         -- Entitlements assigned to this User.
        roles : array
         -- Roles assigned to this User.
        capabilities : array
         -- Capabilities assigned to this User.
        riskScore : number
         -- Composite Risk Score of this User.
        isManager : boolean
         -- A Boolean value that determines if this User is a manager.
        administrator : employee
         -- The Administrator of the RPA or Service Account. This attribute is only applicable if the User type is RPA/Bots or Service.
        displayName : string
         -- The display name of the Administrator of RPA user or Service account.
        value : string
         -- The id of the SCIM resource representing the Administrator of RPA user or Service account.
        $ref : string
         -- The URI of the SCIM resource representing the Administrator of RPA user or Service Account.
        softwareVersion : string
         -- The software version of the RPA/Bots.
        empId : string
         -- Employee id associated with this User.
        dn : string
         -- Distinguished name for this User.
        region : string
         -- The region this User is assigned to.
        regionOwner : string
        location : string
         -- The location this User is assigned to.
        locationOwner : object
        Department : string
         -- Department this User is assigned to.
        costcenter : string[]
         -- Cost centers this User is associated with.
        jobtitle : string
         -- Job title given to this User.
        lastRefresh : date-time
         -- Datetime representation of the last refresh for this User.
     */
    manager: Manager; // TODO: Placeholder for Manager Object
        // displayName : string
        // value : string
        // $ref : string


    constructor(id: string, userName: string, name: Name, displayName: string, userType: string, active: boolean, password: string, emails: Email[], employeeDetails: EmployeeDetail, manager: Manager) {
        this.id = id;
        this.userName = userName;
        this.name = name;
        this.displayName = displayName;
        this.userType = userType;
        this.active = active;
        this.password = password;
        this.emails = emails;
        this.employeeDetails = employeeDetails;
        this.manager = manager;
    }

}
