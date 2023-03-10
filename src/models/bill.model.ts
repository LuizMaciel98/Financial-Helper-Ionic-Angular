export class Bill {
    primaryKey: number | null;
    name: string;
    dueDate: Date | null;
    price: number | null;
    paid: boolean;
    category: string;
    paymentDate: Date | null;
    reminder: boolean;
    notes: string;
    billRecurrent: string | null;
    frequency: string | null;
    isRecurrent: boolean;

    public constructor() {
        this.primaryKey = null;
        this.name = '';
        this.dueDate = null;
        this.price = 0;
        this.paid = false;
        this.category = '';
        this.paymentDate = null;
        this.reminder = false;
        this.notes = '';
        this.billRecurrent = null;
        this.frequency = '';
        this.isRecurrent = false;
    }

}