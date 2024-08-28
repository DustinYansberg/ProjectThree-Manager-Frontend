
export class Appointment {

  id: number;
  title: string;
  description: string;
  datetime: Date;
  organizerId: string;
  attendeeId: string;
  checkedIn: boolean;
  formattedDate: string;
  displayName: string;
  constructor(id: number, title: string, description: string, datetime: Date, organizerId: string, attendeeId: string, checkedIn: boolean) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.datetime = datetime;
    this.organizerId = organizerId;
    this.attendeeId = attendeeId;
    this.checkedIn = checkedIn;
  }
}
