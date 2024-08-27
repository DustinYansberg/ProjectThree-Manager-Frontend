import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Appointment } from '../Models/appointment';
import { AuthService } from './auth.service';

@Injectable()
export class AppointmentService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  //url: String = 'http://4.156.40.62:9001/appointment/';
  url: String = 'http://localhost:8085/appointment/';

  private getHeaders() {
    return this.authService.getHeaders();
  }

  getAppointmentByOrganizerId(id: string) {
    return this.http.get(this.url + 'getByOrganizerId/' + id, { headers: this.getHeaders(), observe: 'response' });
  }

  createAppointment(appointment: Appointment) {
    return this.http.post(this.url + 'create', appointment, { headers: this.getHeaders(), observe: 'response' });
  }

  deleteAppointment(id : number) {
    return this.http.put(this.url + 'delete/' + id, { headers: this.getHeaders(), observe: 'response' });
  }

  

}
