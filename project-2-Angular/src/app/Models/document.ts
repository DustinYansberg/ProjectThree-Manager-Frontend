
export class Document {

    id: number;
    identityId: string;
    name: string;
    fileData: string;
    isCompleted: boolean;
    assignedDateTime: Date;



    constructor(id: number, identityId: string, name: string, fileData: string, isCompleted: boolean, assignedDateTime: Date) {
        this.id = id,
        this.identityId = identityId;
        this.name = name;
        this.fileData = fileData;
        this.isCompleted = isCompleted;
        this.assignedDateTime = assignedDateTime;
    }

}