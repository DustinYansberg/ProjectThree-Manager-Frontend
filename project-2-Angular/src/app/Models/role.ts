export class Role {

    displayableName: string;
    id: string;
    active: boolean;

    constructor(displayableName: string, id: string, active: boolean) {
        this.displayableName = displayableName;
        this.id = id;
        this.active = active;
    }

}