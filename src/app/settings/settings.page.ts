import { Component, OnInit } from '@angular/core';
import { LocalNotifications, ScheduleOptions, ScheduleResult, PendingResult, PendingLocalNotificationSchema, LocalNotificationDescriptor } from '@capacitor/local-notifications';
import { Notification } from 'src/models/notification.model';
import { NotificationDataBase } from 'src/dataBase/notification.dataBase';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.page.html',
    styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

    constructor(private notificationDataBase: NotificationDataBase) { }

    verifyScheduledLocalNotification() {
        LocalNotifications.getPending().then(result => {
            console.log(result);
            console.log(JSON.stringify(result));
        });
    }
    
    verifyNotificationDataBaseRecords() {
        this.notificationDataBase.readObjects('All').then(result => {
            console.log(result);
            console.log(JSON.stringify(result));
        });
    }

    ngOnInit() {
    }

}
