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
        console.log('createDatabase');
        this.sqlite.create({
            name: 'data.db',
            location: 'default'
        }).then((db: SQLiteObject) => {
            this.db = db;
            db.executeSql(`
                CREATE TABLE IF NOT EXISTS bills (
                    primaryKey INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT,
                    dueDate DATE CHECK (dueDate >= '1000-01-01' AND dueDate <= '9999-12-31'),
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
        let dueDateString = bill.dueDate?.toString();
        let dueDateFormatted = dueDateString?.split('/')[2] + '-' + dueDateString?.split('/')[1] + '-' + dueDateString?.split('/')[0];
        const data = [bill.primaryKey, bill.name, dueDateFormatted, bill.price, bill.paid, bill.category, bill.paymentDate, bill.reminder, bill.notes];
        if(this.db){
            try {
                console.log('TRIED TO INSERT');
                return this.db.executeSql('INSERT INTO bills (primaryKey, name, dueDate, price, paid, category, paymentDate, reminder, notes) VALUES (?,?,?,?,?,?,?,?,?)', data)
            } catch (error) {
                console.error(error);
            }
        }
    }

    // Read
    // async getBills(): Promise<Bill[] | null> {
    //     if (!this.db) {
    //         this.createDatabase();
    //     }
    //     const bills: Bill[] = [];
    //     if (this.db) {
    //         try {
    //             const result = await this.db.executeSql('SELECT * FROM bills', []);
    //             for (let i = 0; i < result.rows.length; i++) {
    //                 bills.push(result.rows.item(i));
    //             }
    //             return bills;
    //         } catch (error) {
    //             console.error(error);
    //             return null;
    //         }
    //     } else {
    //         return null;
    //     }
    // }

    async getBills(query: any): Promise<Bill[] | null> {
        console.log('getBills');
        if (!this.db) {
            this.createDatabase();
        }
        const bills: Bill[] = [];
        if (this.db) {
            try {
                let sql = 'SELECT * FROM bills';
                let values: any[] = [];
                let result: any = null;
                console.log('sql: ' + sql);
                console.log('query: ' + query);
                console.log(JSON.stringify(query));
                if(query == 'All'){ 
                    result = await this.db.executeSql(sql, []);
                } else {
                    sql = sql + ' WHERE ';
                    Object.keys(query).forEach((key, index) => {
                        if(key === "dueDate") {
                            sql += ` strftime('%m', ${key}) = ? AND strftime('%Y', ${key}) = ?`;
                            values.push(query[key].month);
                            values.push(query[key].year);
                        } else {
                            sql += ` ${key} = ?`;
                            values.push(query[key]);
                        }
                        if (index < Object.keys(query).length - 1) {
                            sql += ' AND';
                        }
                    });
                    console.log('sql: ' + sql);
                    console.log('values: ' + JSON.stringify(values));
                    result = await this.db.executeSql(sql, values);
                }
                console.log('result: ' + JSON.stringify(result));
                for (let i = 0; i < result.rows.length; i++) {
                    bills.push(result.rows.item(i));
                }
                console.log('bills returned : ' + JSON.stringify(bills));
                return bills;
            } catch (error) {
                console.error(error);
            }
        }
        return null;
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