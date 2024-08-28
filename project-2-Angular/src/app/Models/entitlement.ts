export class Entitlement {

    id: string;
    name: string;
    application: string;
    note: string;
    


    constructor(id: string, name: string, application: string, note: string) {
        this.id = id;
        this.name = name;
        this.application = application;
        this.note = note;
    }

}