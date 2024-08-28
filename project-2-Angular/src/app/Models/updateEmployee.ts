import { Email } from "./email";
import { Manager } from "./manager";
import { Name } from "./name";

export class UpdateEmployee {

  firstName: string;
  lastName: string;
  displayName: string;
  email: string;
  password: string;

  constructor(firstName: string, lastName: string, displayName: string, email: string, password: string) {
    this.firstName = firstName
    this.lastName = lastName;
    this.displayName = displayName;
    this.email = email;
    this.password = password;
  }

}
