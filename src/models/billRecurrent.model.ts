export class BillRecurrent {
    primaryKey: string;
    frequency: string;

    public constructor(primaryKey: string, frequency: string) {
        this.primaryKey = primaryKey;
        this.frequency  = frequency;
    }
}