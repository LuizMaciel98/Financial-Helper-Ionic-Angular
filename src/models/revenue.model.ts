export class Revenue {
    primaryKey: string;
    name: string;
    type: string;
    amount: number | null;
    date: Date;
  
    constructor(primaryKey: string ,name: string, type: string, amount: number | null, date: Date | any) {
      this.primaryKey = primaryKey;
      this.name = name;
      this.type = type;
      this.amount = amount;
      this.date = date;
    }
  }