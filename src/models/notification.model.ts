export class Notification {
    primaryKey: number | null;
    notificationId: string;
    type: string;
    bill: number | null;

    public constructor() {
        this.primaryKey = null;
        this.notificationId = '';
        this.type = '';
        this.bill = null;
    }

}