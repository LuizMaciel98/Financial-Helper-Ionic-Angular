import { Injectable } from '@angular/core';
import { LocalNotifications, ScheduleOptions, PendingResult, PendingLocalNotificationSchema } from '@capacitor/local-notifications';

@Injectable()
export class LocalNotificationService {

    constructor() {}

    public scheduleNotification (title: string, body: string, scheduleDate: Date) {
      let options: ScheduleOptions = {
        notifications: [{
          id: this.getAvailableId(),
          title: "My Test Notification",
          body: "Local Notification Body",
          schedule: {
            at: scheduleDate
          }
        }]
      }
    }

    public sendNotificationNow (title: string, body: string) {
      let options: ScheduleOptions = {
        notifications: [{
          id: this.getAvailableId(),
          title: "My Test Notification",
          body: "Local Notification Body",
        }]
      }

      this.schedule(options);
    }

    private schedule(options: ScheduleOptions) {
      LocalNotifications.schedule(options).then((result) => {
        console.log(JSON.stringify(result));
      });
    }

    private getAvailableId () {
      let availableId:number = 0;
      
      LocalNotifications.getPending().then((result) => {
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

    // public simpleNotif() {
    //   console.log('simpleNotif');

      

    //   // LocalNotifications.schedule(options).then((result) =>{
    //   //   console.log(JSON.stringify(result));
    //   // });

    //   // this.LocalNotifications.schedule({
    //   //   id: 1,
    //   //   text: 'Single Local Notification',
    //   //   // data: { secret: 'secret' }
    //   // });
    //   }

}