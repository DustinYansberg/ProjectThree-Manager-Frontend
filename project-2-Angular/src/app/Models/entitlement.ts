export class Entitlement {

    name: string;
    id: string;
    active: boolean;

    constructor(name: string, id: string, active: boolean) {
        this.name = name;
        this.id = id;
        this.active = active;
    }

}