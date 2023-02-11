import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Bill } from '../models/bill.model';
import { DatabaseCRUD } from '../interfaces/databaseCRUD';

@Injectable()
export class BillDataBase implements DatabaseCRUD {
    private db: SQLiteObject | null = null;

    constructor(private sqlite: SQLite) {
        if (this.db == null){
            this.createDatabase();
        }
    }

    async createDatabase() {
        console.log('createDatabase');
        if (!this.db) {
            await this.sqlite.create({
                name: 'data.db',
                location: 'default'
            }).then((db: SQLiteObject) => {
                db.executeSql(`
                CREATE TABLE IF NOT EXISTS bills (
                    primaryKey INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT,
                    dueDate DATE CHECK (dueDate >= '1000-01-01' AND dueDate <= '9999-12-31'),
                    price REAL,
                    paid BOOLEAN,
                    category TEXT,
                    paymentDate DATE CHECK (dueDate >= '1000-01-01' AND dueDate <= '9999-12-31'),
                    reminder BOOLEAN,
                    notes TEXT,
                    billRecurrent INTEGER,
                    FOREIGN KEY (billRecurrent) REFERENCES billsRecurrent(primaryKey)
                    )
                `, []);
                this.db = db;
                console.log('db inside createDatabase');
                console.log(JSON.stringify(this.db));
            }).catch(error => {
                console.error(error);
                console.error(JSON.stringify(error));
            });
        }
    }

    async createObject(bill: Bill | any) {
        if (!this.db) {
            await this.createDatabase();
        }
        // let dueDateString = bill.dueDate?.toString();
        // let dueDateFormatted = dueDateString?.split('/')[2] + '-' + dueDateString?.split('/')[1] + '-' + dueDateString?.split('/')[0];
        console.log(JSON.stringify(bill.dueDate));
        const data = [bill.primaryKey, bill.name, bill.dueDate, bill.price, bill.paid, bill.category, bill.paymentDate, bill.reminder, bill.notes, bill.billRecurrent];
        if (this.db){ 
            try {
                console.log('TRIED TO INSERT');
                return this.db.executeSql('INSERT INTO bills (primaryKey, name, dueDate, price, paid, category, paymentDate, reminder, notes, billRecurrent) VALUES (?,?,?,?,?,?,?,?,?,?)', data)
            } catch (error) {
                console.error(error);
            }
        }
    }

    async readObjects(query: any): Promise<Bill[] | null> {
        console.log('getBills');
        console.log('this.db');
        console.log(JSON.stringify(this.db));
        if (!this.db) {
            await this.createDatabase();
            console.log('1 after await createDatabase');
        }
        console.log('2 after await createDatabase');
        console.log(JSON.stringify(this.db));
        const bills: Bill[] = [];
        if (this.db) {
            try {
                let sql = 'SELECT * FROM bills';
                let values: any[] = [];
                let result: any = null;
                console.log('sql: ' + sql);
                console.log('query: ' + query);
                console.log(JSON.stringify(query));
                if (query == 'All'){ 
                    result = await this.db.executeSql(sql, []);
                } else {
                    sql = sql + ' WHERE ';
                    Object.keys(query).forEach((key, index) => {
                        if (key === "dueDate") {
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

    async updateObjects(bill: Bill | any) {
        if (!this.db) {
            await this.createDatabase();
        }
        if (this.db) {
            try {
                const data = [bill.primaryKey, bill.name, bill.dueDate, bill.price, bill.paid, bill.category, bill.paymentDate, bill.reminder, bill.notes, bill.billRecurrent];
                return this.db.executeSql(`UPDATE bills SET name=?, dueDate=?, price=?, paid=?, category=?, paymentDate=?, reminder=?, notes=?, billRecurrent=? WHERE primaryKey=?`, data);
            } catch (error) {
                console.error(error);
            }
        }
    }

    async deleteObject(primaryKey: string) {
        if (!this.db) {
            await this.createDatabase();
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