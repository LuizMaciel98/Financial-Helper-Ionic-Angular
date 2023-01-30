export class Bill {
    name: string;
    dueDate: Date | null;
    price: number | null;
    paid: boolean;
    category: string;
    paymentDate: Date | null;
    reminder: boolean;
    notes: string;
    primaryKey: string;

    public constructor() {
        this.name = '';
        this.dueDate = null;
        this.price = 0;
        this.paid = false;
        this.category = '';
        this.paymentDate = null;
        this.reminder = false;
        this.notes = '';
        this.primaryKey = '';
    }
}