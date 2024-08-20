
export class Account {

    displayName: string;
    value: string;
    $ref: string;

    constructor(displayName: string, value: string, $ref: string) {
        this.displayName = displayName;
        this.value = value;
        this.$ref = $ref;
    }

}