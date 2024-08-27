import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Document } from '../Models/document';

@Injectable()
export class DocumentService {

  constructor(private http: HttpClient) { }

  url: String = 'http://4.156.40.62:9001/document/';
  // url: String = 'http://localhost:8085/document/';

  getDocumentByIdentity(id: string) {
    return this.http.get(this.url + 'getdocs/' + id, { observe: 'response' });
  }

  createDocument(document: Document) {
    return this.http.post(this.url + 'createdoc', document, { observe: 'response' });
  }

  completeDocument(id : number) {
    return this.http.put(this.url + 'complete/' + id, { observe: 'response' });
  }

  

}
