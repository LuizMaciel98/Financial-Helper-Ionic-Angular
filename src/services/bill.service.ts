import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Bill } from '../models/bill.model';

@Injectable()
export class BillService {
    private db: SQLiteObject | null = null;

    constructor(private sqlite: SQLite) {
      this.createDatabase();
    }

    createDatabase() {
        this.sqlite.create({
            name: 'data.db',
            location: 'default'
        }).then((db: SQLiteObject) => {
            this.db = db;
            db.executeSql(`
                CREATE TABLE IF NOT EXISTS bills (
                    primaryKey TEXT PRIMARY KEY,
                    name TEXT,
                    dueDate DATE,
                    price REAL,
                    paid BOOLEAN,
                    category TEXT,
                    paymentDate DATE,
                    reminder BOOLEAN,
                    notes TEXT
                )
            `, []);
        }).catch(error => console.error(error));
    }

    // Create
    async addBill(bill: Bill) {
        if(!this.db) {
            this.createDatabase();
        }
        const data = [bill.primaryKey, bill.name, bill.dueDate, bill.price, bill.paid, bill.category, bill.paymentDate, bill.reminder, bill.notes];
        if(this.db){
            try {
                console.log('TRIED TO INSERT');
                return this.db.executeSql('INSERT INTO bills (primaryKey, name, dueDate, price, paid, category, paymentDate, reminder, notes) VALUES (?,?,?,?,?,?,?,?,?)', data)
            } catch (error) {
                console.error(error);
            }
        }
    }

    async getBills(): Promise<Bill[] | null> {
        if (!this.db) {
            this.createDatabase();
        }
        const bills: Bill[] = [];
        if (this.db) {
            try {
                const result = await this.db.executeSql('SELECT * FROM bills', []);
                for (let i = 0; i < result.rows.length; i++) {
                    bills.push(result.rows.item(i));
                }
                return bills;
            } catch (error) {
                console.error(error);
                return null;
            }
        } else {
            return null;
        }
    }
    
    // Update
    async updateBill(bill: Bill) {
        if (!this.db) {
            this.createDatabase();
        }
        if (this.db) {
            try {
                const data = [bill.primaryKey, bill.name, bill.dueDate, bill.price, bill.paid, bill.category, bill.paymentDate, bill.reminder, bill.notes];
                return this.db.executeSql(`UPDATE bills SET name=?, dueDate=?, price=?, paid=?, category=?, paymentDate=?, reminder=?, notes=? WHERE primaryKey=?`, data);
            } catch (error) {
                console.error(error);
            }
        }
    }
    
    // Delete
    async deleteBill(primaryKey: string) {
        if (!this.db) {
            this.createDatabase();
        }
        if (this.db) {
            try {
                return this.db.executeSql('DELETE FROM bills WHERE primaryKey=?', [primaryKey]);
            } catch (error) {
                console.error(error);
            }
        }
    }
}