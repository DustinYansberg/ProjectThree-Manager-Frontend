import { Name } from './name'; // Import the 'Name' type from the appropriate file

export class Email {

    type: string;
    value: string;
    primary: boolean;

    constructor(type: string, value: string, primary: boolean) {
        this.type = type;
        this.value = value;
        this.primary = primary;
    }

}
