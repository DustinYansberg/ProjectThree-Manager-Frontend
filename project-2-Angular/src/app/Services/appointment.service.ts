import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Appointment } from '../Models/appointment';


@Injectable()
export class AppointmentService {

  constructor(private http: HttpClient) { }

  url: String = 'http://4.156.40.62:9001/appointment/';
  // url: String = 'http://localhost:8085/appointment/';


  getAppointmentByOrganizerId(id: string) {
    return this.http.get(this.url + 'getByOrganizerId/' + id, {  observe: 'response' });
  }

  createAppointment(appointment: Appointment) {
    return this.http.post(this.url + 'create', appointment, { observe: 'response' });
  }

  deleteAppointment(id : number) {
    return this.http.delete(this.url + 'delete/' + id, { observe: 'response' });
  }

  

}
