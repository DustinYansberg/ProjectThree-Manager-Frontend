import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Document } from '../Models/document';
import { AuthService } from './auth.service';

@Injectable()
export class DocumentService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  url: String = 'http://4.156.40.62:9001/document/';
  // url: String = 'http://localhost:8085/document/';

  private getHeaders() {
    return this.authService.getHeaders();
  }

  getDocumentByIdentity(id: string) {
    return this.http.get(this.url + 'getdocs/' + id, { headers: this.getHeaders(), observe: 'response' });
  }

  createDocument(document: Document) {
    return this.http.post(this.url + 'createdoc', document, { headers: this.getHeaders(), observe: 'response' });
  }

  completeDocument(id : number) {
    return this.http.put(this.url + 'complete/' + id, { headers: this.getHeaders(), observe: 'response' });
  }

  

}
