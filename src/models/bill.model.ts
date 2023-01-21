export interface Bill {
    name: string;
    dueDate: Date;
    price: number;
    paid: boolean;
    category: string;
    paymentDate: Date;
    reminder: boolean;
    notes: string;
}