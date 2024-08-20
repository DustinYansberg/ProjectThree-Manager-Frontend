// displayName : string
        // value : string
        // $ref : string

export class EmployeeDetail {

    displayName: string;
    value: string;
    $ref: string;

    constructor(displayName: string, value: string, $ref: string) {
        this.displayName = displayName;
        this.value = value;
        this.$ref = $ref;
    }

}