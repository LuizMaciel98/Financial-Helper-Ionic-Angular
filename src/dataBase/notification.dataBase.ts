import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Notification } from '../models/notification.model';
import { DatabaseCRUD } from '../interfaces/databaseCRUD';
import { DatabaseUtils, InsertQuery } from '../utils/databaseUtils';

@Injectable()
export class NotificationDataBase implements DatabaseCRUD {
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
                CREATE TABLE IF NOT EXISTS notifications (
                    PrimaryKey INTEGER PRIMARY KEY AUTOINCREMENT,
                    NotificationId TEXT NOT NULL UNIQUE CHECK(NotificationId GLOB '[0-9]*'),
                    Type TEXT NOT NULL,
                    Bill INTEGER,
                    FOREIGN KEY (Bill) REFERENCES bills(PrimaryKey)
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

    async createObject(notification : Notification | any) {
        
        if (!this.db) {
            await this.createDatabase();
        }
        if (this.db) {
            try {
                let insertQuery: InsertQuery = DatabaseUtils.getInsertQuery(notification);

                console.log(JSON.stringify(insertQuery));

                console.log('TRIED TO INSERT');
                return this.db.executeSql(
                    'INSERT INTO notifications (' + insertQuery.insertQueryFields + ') VALUES (' + insertQuery.insertQueryValuesSize + ')', insertQuery.insertQueryValues
                );
            } catch (error) {
                console.error(error);
            }
        }
    }

    async readObjects(query: any): Promise<Notification[] | null> {
        if (!this.db) {
            await this.createDatabase();
            console.log('1 after await createDatabase');
        }
        const notifications: Notification[] = [];
        if (this.db) {
            try {
                let sql = 'SELECT * FROM notifications';
                let values: any[] = [];
                let result: any = null;
                if (query == 'All') {
                    result = await this.db.executeSql(sql, []);
                    console.log(result);
                    console.log(JSON.stringify(result));
                }

                if (result != null && result.rows != null && result.rows.length > 0) {
                    for (let i = 0; i < result.rows.length; i++) {
                        notifications.push(result.rows.item(i));
                    }
                    return notifications;
                }
            } catch (error) {
                console.error(error);
            }
        }
        return null;
    }
    

    async updateObjects(notification: Notification | any) {
        if (!this.db) {
            await this.createDatabase();
        }
        if (this.db) {
            try {
                const data = [notification.PrimaryKey, notification.NotificationId, notification.Type];
                return this.db.executeSql(`UPDATE notifications SET NotificationId=?, Type=? WHERE PrimaryKey=?`, data);
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
                return await this.db.executeSql('DELETE FROM notifications WHERE PrimaryKey=?', [primaryKey]);
            } catch (error) {
                console.error(error);
            }
        }
    }
}