export class BillRecurrent {
    primaryKey: number | null;
    frequency: string;

    public constructor(primaryKey: number | null, frequency: string) {
        this.primaryKey = primaryKey;
        this.frequency  = frequency;
    }
}