import { Injectable } from '@angular/core';
import { LocalNotifications, ScheduleOptions, ScheduleResult, PendingResult, PendingLocalNotificationSchema, LocalNotificationDescriptor, CancelOptions } from '@capacitor/local-notifications';
import { Bill } from 'src/models/bill.model';
import { Notification } from 'src/models/notification.model';
import { NotificationDataBase } from 'src/dataBase/notification.dataBase';

@Injectable()
export class LocalNotificationService {

    constructor(private notificationDataBase: NotificationDataBase) {}

    public async createNotification(bill: Bill, type: string) {
        console.log('LocalNotificationService.createNotification');
        this.purgeNotificationObject();

        if (type == 'overdue') {
            await this.createOverDueDateNotification(bill);
        } else if (type == 'dueDate') {
            await this.createDueDateNotification(bill);
        }
    }

    private async createOverDueDateNotification(bill: Bill) {
        let scheduleDate: Date = new Date();
        if (bill.dueDate != null)
            scheduleDate = new Date(bill.dueDate);

        scheduleDate.setDate(scheduleDate.getDate() + 1);
        let title: string = bill.name + 'está vencida!!';
        let body: string = 'Por favor lembre de pagar esta conta!';
        this.scheduleAndCreateNotification(bill, title, body, scheduleDate);
    }

    private async createDueDateNotification(bill: Bill) {
        let scheduleDate: Date = new Date();
        if (bill.dueDate != null)
            scheduleDate = new Date(bill.dueDate);
        let title: string = bill.name + 'vence hoje!!';
        let body: string = 'Por favor lembre de pagar esta conta!';
        this.scheduleAndCreateNotification(bill, title, body, scheduleDate);
    }

    private async scheduleAndCreateNotification(bill: Bill, title: string, body: string, scheduleDate: Date) {
        // let dueDate: Date;
        // if (bill.dueDate != null) {
        //     dueDate = new Date(bill.dueDate);
            
            let scheduled:ScheduleResult;

            scheduled = await this.scheduleNotification(title, body, scheduleDate);
            console.log(JSON.stringify(scheduled));

            if (scheduled != null && scheduled.notifications != null && scheduled.notifications.length > 0) {
                for (let i = 0; i < scheduled.notifications.length; i++) {
                    let currentNotif:LocalNotificationDescriptor = scheduled.notifications[i];

                    console.log('bill:' + JSON.stringify(bill));

                    this.createNotificationObject(bill.primaryKey, currentNotif.id.toString());
                }
            }
        // }
    }

    private async createNotificationObject(primaryKey: number | any, currentNotifId: string) {
        let notification: Notification = new Notification();
        notification.bill = primaryKey;
        notification.notificationId = currentNotifId;
        notification.type = 'Duedate Notification';

        this.notificationDataBase.createObject(notification);
    }

    private async purgeNotificationObject() {
        console.log('purgeNotificationObject');

        let deleteList: Notification[] = []; 

        //GET ALL FROM LOCAL NOTIFICATION
        //GET ALL FROM DB
        
        let pendingLocalNotification: PendingResult = await LocalNotifications.getPending();
        console.log('pendingLocalNotification');
        console.log(JSON.stringify(pendingLocalNotification));

        const mapPendingIdObject = new Map<number, PendingLocalNotificationSchema>();

        if (pendingLocalNotification != null) {
            let pendingLocNotf: PendingLocalNotificationSchema[] = pendingLocalNotification.notifications;

            if (pendingLocNotf != null && pendingLocNotf.length > 0) {
                for (let i = 0; i < pendingLocNotf.length; i++) {
                    let currentPendingLocNotf: PendingLocalNotificationSchema = pendingLocNotf[i];
                    mapPendingIdObject.set(currentPendingLocNotf.id, currentPendingLocNotf);
                }
            }
        }
        
        let notificationDB: Notification[];
        notificationDB = await this.notificationDataBase.readObjects('all') as Notification[];
        
        console.log('notificationDB');
        console.log(JSON.stringify(notificationDB));

        if (mapPendingIdObject != null && mapPendingIdObject.size > 0) {
            if (notificationDB != null && notificationDB.length > 0) {
                notificationDB.forEach(currentNotificationDB => {
                    let localNotif = mapPendingIdObject.get(parseInt(currentNotificationDB.notificationId));

                    if (localNotif == null) {
                        //delete notificationDB
                        deleteList.push(currentNotificationDB);
                    }
                });
            }
        }

        // deleteList.forEach(async currentElement => {

        if (deleteList != null && deleteList.length > 0) {
            for (let i = 0; i < deleteList.length; i++) {
                let currentElement: Notification = deleteList[i]; 

                if (currentElement.primaryKey != null) {
                    await this.notificationDataBase.deleteObject(currentElement.primaryKey.toString());
                }
            }
        }
        // });
    }

    private async scheduleNotification (title: string, body: string, scheduleDate: Date) {
        let availableId: number = await this.getAvailableId();

        let options: ScheduleOptions = {
            notifications: [{
                id: availableId,
                title: "My Test Notification",
                body: "Local Notification Body",
                schedule: {
                    at: scheduleDate
                }
            }]
        }

        console.log(JSON.stringify(options));

        return await this.schedule(options) as ScheduleResult;
    }

    public async sendNotificationNow (title: string, body: string) {
        let availableId: number = await this.getAvailableId();

        let options: ScheduleOptions = {
            notifications: [{
                id: availableId,
                title: "My Test Notification",
                body: "Local Notification Body",
            }]
        }

      return this.schedule(options);
    }

    private async schedule(options: ScheduleOptions) {
        return await LocalNotifications.schedule(options);
    }

    private async getAvailableId () {
        let availableId:number = 0;
        
        await LocalNotifications.getPending().then((result) => {
            if (result != null) {
                if (result.notifications != null) {
                    let length = result.notifications.length;
                    for (let i = 0; i < length; i ++) {
                        if (availableId === i) {
                            availableId++;
                        } else {
                            break;
                        }
                    }
                }
            }
        });

      return availableId;
    }

    public async cancelNotifications(localNotifIds: number[]) {
        let lstLocalNotfDescriptor: LocalNotificationDescriptor[] = [];

        for (let i = 0; i < localNotifIds.length; i++) {
            let auxLocalNotfDescriptor: LocalNotificationDescriptor = {
                id: localNotifIds[i]
            };
            lstLocalNotfDescriptor.push(auxLocalNotfDescriptor);
        }

        let cancelOptions: CancelOptions = {
            notifications: lstLocalNotfDescriptor
        };

        LocalNotifications.cancel(cancelOptions);
    }

    public async deleteNotifications(primaryKey: number) {

        let notifications: Notification[] = await this.notificationDataBase.executeQuery('SELECT * FROM notifications WHERE Bill = \'' + primaryKey + '\'');
        let localNotifIds: any[] = [];

        if (notifications != null && notifications.length > 0) {
            notifications.forEach(currentNotification => {
                localNotifIds.push(currentNotification.notificationId);
            });

            if (localNotifIds != null && localNotifIds.length > 0) {
                await this.cancelNotifications(localNotifIds);
            }

            for (let i = 0; i < notifications.length; i++){
                let currentNotif = notifications[i];
                if (currentNotif != null && currentNotif.primaryKey != null) {
                    await this.notificationDataBase.deleteObject(currentNotif.primaryKey.toString());
                }
            }
        }
    }
}