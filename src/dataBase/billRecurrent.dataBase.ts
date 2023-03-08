import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { BillRecurrent } from '../models/billRecurrent.model';
import { DatabaseCRUD } from '../interfaces/databaseCRUD';
import { DatabaseUtils, InsertQuery, UpdateQuery } from 'src/utils/databaseUtils';

@Injectable()
export class BillRecurrentDataBase implements DatabaseCRUD {
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
                CREATE TABLE IF NOT EXISTS billsRecurrent (
                    primaryKey INTEGER PRIMARY KEY AUTOINCREMENT,
                    frequency TEXT CHECK (frequency IN ('daily', 'weekly', 'monthly', 'annually'))
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
    
    async createObject(billRecurrent: BillRecurrent | any) {
        if (!this.db) {
            await this.createDatabase();
        }
        if (this.db) {
            try {
                let insertQuery: InsertQuery = DatabaseUtils.getInsertQuery(billRecurrent);

                return await this.db.executeSql(
                    'INSERT INTO billsRecurrent (' + insertQuery.queryFields + ') VALUES (' + insertQuery.queryValuesSize + ')', insertQuery.queryValues
                );
            } catch (error) {
                console.log(error);
                console.log(JSON.stringify(error));
            }
        }
    }

    async readObjects(query: any): Promise<BillRecurrent[] | null> {
        console.log('getBills');
        console.log('this.db');
        console.log(JSON.stringify(this.db));
        if (!this.db) {
            await this.createDatabase();
            console.log('1 after await createDatabase');
        }
        console.log('2 after await createDatabase');
        console.log(JSON.stringify(this.db));
        const billsReccurent: BillRecurrent[] = [];
        if (this.db) {
            try {
                let sql = 'SELECT * FROM billsRecurrent';
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
                        if (key === "frequency") {
                            sql += ` frequency = ?`;
                            values.push(query[key]);
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
                    billsReccurent.push(result.rows.item(i));
                }
                console.log('bills returned : ' + JSON.stringify(billsReccurent));
                return billsReccurent;
            } catch (error) {
                console.error(error);
            }
        }
        return null;
    }    

    async updateObjects(billRecurrent: BillRecurrent | any) {
        if (!this.db) {
            await this.createDatabase();
        }
        if (this.db) {
            try {
                let updateQuery: UpdateQuery = DatabaseUtils.getUpdateQuery(billRecurrent);

                return await this.db.executeSql(
                    'UPDATE billsRecurrent SET ' + updateQuery.queryFields + ' WHERE primaryKey=?', updateQuery.queryValues
                );
            } catch (error) {
                console.log(error);
                console.log(JSON.stringify(error));
            }
        }
    }

    async deleteObject(primaryKey: string) {
        if (!this.db) {
            await this.createDatabase();
        }
        if (this.db) {
            try {
                return this.db.executeSql('DELETE FROM billsRecurrent WHERE primaryKey=?', [primaryKey]);
            } catch (error) {
                console.error(error);
            }
        }
    }
    
    
}