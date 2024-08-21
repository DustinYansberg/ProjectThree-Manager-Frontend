import { Employee } from "./employee";
import { Role } from "./role";

export class Request {

  id: string;
  employee: Employee;
  role: Role;
  note: string;

  constructor(id: string, employee: Employee, role: Role, note: string) {
        this.id = id;
        this.employee = employee;
        this.role = role;
        this.note = note;
    }

}
