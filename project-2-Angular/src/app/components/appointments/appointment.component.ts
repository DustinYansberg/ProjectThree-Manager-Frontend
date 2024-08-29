import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { timeout } from 'rxjs';
import { Appointment } from 'src/app/Models/appointment';
import { Employee } from 'src/app/Models/employee';

import { AppointmentService } from 'src/app/Services/appointment.service';
import { EmployeeService } from 'src/app/Services/employee.service';
import { UserService } from '../../Services/user.service';

@Component({
    templateUrl: './appointment.component.html',
    providers: [MessageService]
})
export class AppointmentComponent implements OnInit {

    //get by id GET

    //create doc POST

    //complete doc PUT

    appointments: Appointment[] = [];

    defaultAppointment: Appointment = new Appointment(0, "", "", new Date(Date.now()), "", "", false);

    appointmentDialog: boolean = false;

    deleteAppointmentDialog: boolean = false;
    
    submitted: boolean = false;

    appointment: Appointment = this.defaultAppointment;

    cols: any[];

    loading: boolean = false;

    creatingAppointment: boolean;

    employee: Employee;

    employees: any[] = [];
;

   identityId: string;

  constructor(private appointmentService: AppointmentService, private messageService: MessageService, private userService: UserService, private employeeService: EmployeeService) {
      this.userService.idObservable.subscribe(id => {
        this.identityId = id
      });
      console.log(this.identityId);
    }

    ngOnInit() {
      this.loading = true;

      while (this.identityId == null) {
        
      };

      this.employeeService.getByManager(this.identityId)
        .pipe(timeout(20000)) // 20 seconds timeout
        .subscribe({
          next: (response) => {
            let body: any = response.body;
            console.log(response);

            body.Resources.forEach((resource: Employee) => {
              console.log(this.employees);
              this.employees.push({ label: resource.displayName.slice(0, 30).toString(), value: resource.id.toString() });

            });
            console.log(this.employees);
          },
          error: (err) => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: err.message, life: 3000 });
          }
        });

      this.appointmentService.getAppointmentByOrganizerId(this.identityId)
        .subscribe({
          next: (response) => {
            let body: any = response.body;

            body.forEach((resource: Appointment) => {
              if (resource.datetime) {
                resource.displayName = this.employees.find(x => x.value === resource.attendeeId).label;
                resource.formattedDate = new Date(resource.datetime).toLocaleString();
              }
            });

            this.appointments = body;
            this.loading = false;
          },
          error: (err) => {
            this.loading = false;
            this.messageService.add({ severity: 'error', summary: 'Error', detail: err.message, life: 3000 });
          }
        });

      

      

      

        //this.employeeService.getAllEmployees(1, 1000)
        //.pipe(timeout(20000)) // 20 seconds timeout
        //.subscribe({
        //    next: (response) => {
        //        let body: any = response.body;

        //        body.Resources.forEach((resource: any) => {
        //            this.employees.push({ label: resource.displayName.slice(0, 30).toString(), value: resource.id.toString() });
        //        });
        //    },
        //    error: (err) => {
        //        this.loading = false;
        //        this.messageService.add({ severity: 'error', summary: 'Error', detail: err.message, life: 3000 });
        //    }
        //});
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
        this.appointment = this.defaultAppointment;
        this.submitted = false;
        this.appointmentDialog = true;
        this.creatingAppointment = true;
    }

    deleteAppointment(appointment: Appointment) {
        this.deleteAppointmentDialog = true;
        this.appointment = { ...appointment };
  }

    confirmDelete() {
      this.deleteAppointmentDialog = false;
      this.appointmentService.deleteAppointment(this.appointment.id)
        .pipe(timeout(5000)) // 5 seconds timeout
        .subscribe({
          next: (response) => {
            this.appointments = this.appointments.filter(val => val.id !== this.appointment.id);
            this.appointment = this.defaultAppointment;
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Appointment Deleted', life: 3000 });
          },
          error: (err) => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: err.message, life: 3000 });
          }
        });
      
    }



    hideDialog() {
        this.appointmentDialog = false;
        this.submitted = false;
        this.creatingAppointment = false;
    }

    createAppointment() {
      this.submitted = true;
      this.appointment.organizerId = this.identityId;
           {
            //identity.id 
            //name
            //file
                this.appointmentService.createAppointment(this.appointment)
                    .pipe(timeout(5000)) // 5 seconds timeout
                    .subscribe({
                        next: (response) => {
                            console.log(response);
                        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Appointment Created', life: 3000 });
                        this.appointment = response.body as Appointment;
                            this.appointment.formattedDate = new Date(this.appointment.datetime).toLocaleString();
                            this.appointments.push(this.appointment);
                        },
                        error: (err) => {
                            this.messageService.add({ severity: 'error', summary: 'Error', detail: "Unable to create Appointment, check fields and try again", life: 3000 });
                        }
                    });
            }

        this.appointmentDialog = false;
        this.creatingAppointment = false;
        }


    findIndexById(id: number): number {
        let index = -1;
        for (let i = 0; i < this.appointments.length; i++) {
            if (this.appointments[i].id === id) {
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
