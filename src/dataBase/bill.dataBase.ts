import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Bill } from '../models/bill.model';
import { DatabaseCRUD } from '../interfaces/databaseCRUD';

@Injectable()
export class BillDataBase implements DatabaseCRUD {
    private db: SQLiteObject | null = null;

    constructor(private sqlite: SQLite) {
        if (this.db == null) {
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
                    name TEXT NOT NULL,
                    dueDate DATE CHECK (dueDate >= '1000-01-01' AND dueDate <= '9999-12-31' AND dueDate LIKE '____-__-__' AND dueDate NOT NULL),
                    price REAL NOT NULL,
                    paid BOOLEAN,
                    category TEXT,
                    paymentDate DATE CHECK (paymentDate >= '1000-01-01' AND paymentDate <= '9999-12-31' AND paymentDate LIKE '____-__-__'),
                    reminder BOOLEAN,
                    notes TEXT,
                    billRecurrent INTEGER,
                    FOREIGN KEY (billRecurrent) REFERENCES billsRecurrent(primaryKey)
                    )
                `, []);
                this.db = db;
            }).catch(error => {
                console.error('EXCEPTION');
                console.error(error);
                console.error(JSON.stringify(error));
            });
        }
    }

    async createObject(bill: Bill | any) {
        if (!this.db) {
            await this.createDatabase();
        }
        let billDueDate = new Date(bill.dueDate);

        let billDateMonth: string;
        billDateMonth = (billDueDate.getMonth() + 1).toString();
        if (billDateMonth.length == 1)
            billDateMonth = '0' + billDateMonth;

        let dueDateString = billDueDate.getFullYear() + '-' + billDateMonth + '-' + billDueDate.getDate();

        const data = await [bill.name, dueDateString, bill.price, bill.paid, bill.category, bill.paymentDate, bill.reminder, bill.notes, bill.billRecurrent];
        if (this.db) {
            try {
                return await this.db.executeSql('INSERT INTO bills (name, dueDate, price, paid, category, paymentDate, reminder, notes, billRecurrent) VALUES (?,?,?,?,?,?,?,?,?)', data);
            } catch (error) {
                console.error(error);
            }
        }
    }

    async readObjects(query: any): Promise<Bill[] | null> {
        if (!this.db) {
            await this.createDatabase();
            console.log('1 after await createDatabase');
        }
        const bills: Bill[] = [];
        if (this.db) {
            try {
                let sql = 'SELECT * FROM bills';
                let values: any[] = [];
                let result: any = null;
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
                    result = await this.db.executeSql(sql, values);
                }
                for (let i = 0; i < result.rows.length; i++) {
                    bills.push(result.rows.item(i));
                }
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

    async executeQuery(query:string) {
        let bills:any = [];
        
        console.log('executeQuery');
        console.log(JSON.stringify(query));
        if (!this.db) {
            await this.createDatabase();
        }
        if (this.db) {
            try {
                console.log(JSON.stringify(this.db));
                console.log('executeQuery 2');
                let result = await this.db.executeSql(query, []);
                for (let i = 0; i < result.rows.length; i++) {
                    bills.push(result.rows.item(i));
                }
            } catch (error) {
                console.log('executeQuery error');
                console.log(error);
                console.log(JSON.stringify(error));
            }
        }

        console.log(JSON.stringify(bills));
        return bills;
    }
}