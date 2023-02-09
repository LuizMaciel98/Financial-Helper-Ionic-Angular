import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Revenue } from '../models/revenue.model';
import { DatabaseCRUD } from '../interfaces/databaseCRUD';

@Injectable()
export class RevenueDataBase implements DatabaseCRUD {
    private db: SQLiteObject | null = null;

    constructor(private sqlite: SQLite) {
        if(this.db == null){
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
                CREATE TABLE IF NOT EXISTS revenues (
                    primaryKey INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT,
                    type TEXT,
                    amount REAL,
                    date DATE
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

    // Create
    async addObject(revenue: Revenue | any) {
        if(!this.db) {
            await this.createDatabase();
        }
        const data = [revenue.type, revenue.amount, revenue.date];
        if(this.db){
            try {
                console.log('TRIED TO INSERT');
                return this.db.executeSql('INSERT INTO revenues (type, amount, date) VALUES (?,?,?)', data)
            } catch (error) {
                console.error(error);
            }
        }
    }

    // Read
    async getObjects(query: any): Promise<Revenue[] | null> {
        console.log('getRevenue');
        console.log('this.db');
        console.log(JSON.stringify(this.db));
        if (!this.db) {
            await this.createDatabase();
            console.log('1 after await createDatabase');
        }
        console.log('2 after await createDatabase');
        console.log(JSON.stringify(this.db));
        const revenue: Revenue[] = [];
        if (this.db) {
            try {
                let sql = 'SELECT * FROM revenues';
                let values: any[] = [];
                let result: any = null;
                console.log('sql: ' + sql);
                console.log('query: ' + query);
                console.log(JSON.stringify(query));
                if (query == 'All') {
                    result = await this.db.executeSql(sql, []);
                } else {
                    sql = sql + ' WHERE ';
                    Object.keys(query).forEach((key, index) => {
                        if (key === "date") {
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
                    revenue.push(result.rows.item(i));
                }
                console.log('revenue returned : ' + JSON.stringify(revenue));
                return revenue;
            } catch (error) {
                console.error(error);
            }
        }
        return null;
    }

    // Update Revenue
    async updateObjects(revenue: Revenue | any) {
        if (!this.db) {
            await this.createDatabase();
        }
        if (this.db) {
            try {
                const data = [revenue.name, revenue.type, revenue.amount, revenue.date, revenue.primaryKey,];
                return this.db.executeSql(`UPDATE revenues SET name=?, type=?, amount=?, date=? WHERE primaryKey=?`, data);
            } catch (error) {
                console.error(error);
            }
        }
    }

    // Delete
    async deleteObject(primaryKey: string) {
    if (!this.db) {
        await this.createDatabase();
    }
    if (this.db) {
        try {
            return this.db.executeSql('DELETE FROM revenues WHERE primaryKey=?', [primaryKey]);
        } catch (error) {
            console.error(error);
        }
    }
}



}