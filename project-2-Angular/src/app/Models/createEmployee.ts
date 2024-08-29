import { Email } from "./email";
import { Manager } from "./manager";
import { Name } from "./name";

export class CreateEmployee {

  userName: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  managerId: string;
  softwareVersion: string;
  administratorId: string;
  displayName: string;
  active: boolean;
  userType: string;
  department: string;

  constructor(userName: string, password: string, firstName: string, lastName: string, email: string, managerId: string, softwareVersion: string, administratorId: string, displayName: string, active: boolean, userType: string, department: string) {
    this.userName = userName;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.managerId = managerId;
    this.softwareVersion = softwareVersion;
    this.administratorId = administratorId;
    this.displayName = displayName;
    this.active = active;
    this.userType = userType;
    this.department = department;
  }

}
