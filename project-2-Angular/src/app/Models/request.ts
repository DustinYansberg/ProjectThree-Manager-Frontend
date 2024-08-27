import { Employee } from "./employee";
import { Role } from "./role";

export class Request {

  requestId: string;
  ownerId: string;
  requesterId: string;
  entitlementId: string;
  processed: boolean;
  approved: boolean;
  description: string;

  constructor(
    requestId: string = '',
    ownerId: string = '',
    requesterId: string = '',
    entitlementId: string = '',
    processed: boolean = false,
    approved: boolean = false,
    description: string = ''
  ) {
    this.requestId = requestId;
    this.ownerId = ownerId;
    this.requesterId = requesterId;
    this.entitlementId = entitlementId;
    this.processed = processed;
    this.approved = approved;
    this.description = description;
  }

}


// {
//   "requestId": "1",
//   "ownerId": "manager123",
//   "requesterId": "user001",
//   "entitlementId": "entitlement001",
//   "processed": false,
//   "approved": false,
//   "description": "Request 1 for manager123"
// }
