import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { timeout } from 'rxjs';
import { Document } from 'src/app/Models/document';
import { Employee } from 'src/app/Models/employee';

import { DocumentService } from 'src/app/Services/document.service';
import { EmployeeService } from 'src/app/Services/employee.service';

@Component({
    templateUrl: './document.component.html',
    providers: [MessageService]
})
export class DocumentComponent implements OnInit {

    //get by id GET

    //create doc POST

    //complete doc PUT

    documents: Document[] = [];

    documentsCompleted: Document[] = [];
    
    defaultDocument: Document = new Document(0,"","", new Uint8Array ,false,null);

    documentDialog: boolean = false;

    deleteDocumentDialog: boolean = false;
    
    submitted: boolean = false;

    document: Document = this.defaultDocument;

    cols: any[];

    loading: boolean = false;

    creatingDocument: boolean;

    employee: Employee;

    employees: any[];

    constructor(private documentService: DocumentService, private messageService: MessageService, private employeeService: EmployeeService) {}

    ngOnInit() {
        this.loading = true;
        this.employeeService.getAllEmployees()
        .pipe(timeout(20000)) // 20 seconds timeout
        .subscribe({
            next: (response) => {
                let body: any = response.body;

                body.Resources.forEach((resource: any) => {
                    this.employees.push({ label: resource.displayName.slice(0, 30).toString(), value: resource.id.toString() });
                });
            },
            error: (err) => {
                this.loading = false;
                this.messageService.add({ severity: 'error', summary: 'Error', detail: err.message, life: 3000 });
            }
        });
    }

    customSort(event: any) {
        event.data.sort((data1: any, data2: any) => {
            let value1 = this.resolveFieldData(data1, event.field);
            let value2 = this.resolveFieldData(data2, event.field);
            let result = null;

            // Check if value1 and value2 are objects and pull out their 'value' property
            if (typeof value1 === 'object' && value1 !== null) {
                value1 = value1[0].value;
            }
            if (typeof value2 === 'object' && value2 !== null) {
                value2 = value2[0].value;
            }
    
            if (value1 == null && value2 != null)
                result = -1;
            else if (value1 != null && value2 == null)
                result = 1;
            else if (value1 == null && value2 == null)
                result = 0;
            else if (typeof value1 === 'string' && typeof value2 === 'string')
                result = value1.localeCompare(value2);
            else
                result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;
    
            return (event.order * result);
        });
    }

    resolveFieldData(data: any, field: string): any {
        if (data && field) {
            let fields = field.split('.');
            let value = data;
            for (let i = 0; i < fields.length; i++) {
                if (value == null) {
                    return null;
                }
                value = value[fields[i]];
            }
            return value;
        } else {
            return null;
        }
    }

    openNew() {
        this.document = this.defaultDocument;
        this.submitted = false;
        this.documentDialog = true;
        this.creatingDocument = true;
    }

    editDocument(docuemnt: Document) {
        this.document = { ...docuemnt };
        this.documentDialog = true;
        this.creatingDocument = false;
    }

    deleteDocument(document: Document) {
        this.deleteDocumentDialog = true;
        this.document = { ...document };
    }



    hideDialog() {
        this.documentDialog = false;
        this.submitted = false;
        this.creatingDocument = false;
    }

    getDocumentsByIdentity(){
        this.loading = true;
        this.documentService.getDocumentByIdentity(this.employee.id).subscribe(
            {next: (response) => {
                console.log(response)
                let body : any = response.body;
                this.documents = body;
                this.loading = false;
            }, 
            error : (err) => {
                console.log(err)
                this.loading = false;
                this.messageService.add({ severity: 'error', summary: 'Error', detail: "Unable to fetch Employee Documents, try again", life: 3000 });
            }
        }
            
        );
    }

    createDocument() {
        this.submitted = true;
           {
            //identity.id 
            //name
            //file
                this.documentService.createDocument(this.document)
                    .pipe(timeout(5000)) // 5 seconds timeout
                    .subscribe({
                        next: (response) => {
                            console.log(response);
                            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Document Created', life: 3000 });
                        },
                        error: (err) => {
                            this.messageService.add({ severity: 'error', summary: 'Error', detail: "Unable to create Document, check fields and try again", life: 3000 });
                        }
                    });
            }

        this.documentDialog = false;
        this.creatingDocument = false;
        }


    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.documents.length; i++) {
            if (this.documents[i].identityId === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
    
}
