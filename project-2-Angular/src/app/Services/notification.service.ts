import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class NotificationService {

  constructor(private http: HttpClient) { }

   //url: String = 'http://localhost:8082/notification/';
  url: String = 'http://4.156.40.62:9001/notification/'

  createNotification(Notification: any) {
    return this.http.post(this.url + 'notification', Notification, { observe: 'response' });
  }

}
