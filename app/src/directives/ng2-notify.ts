///<reference path="../../../typings/browser.d.ts"/>
import {bootstrap} from "angular2/platform/browser";
import {Component, View, Input} from "angular2/core";
import {Ng2NotifyService} from "../services/ng2-notify";

@Component({
    selector: 'ng2-notify',
    template: `
    <ul class="{{corner}}">
        <li *ngFor="#notification of notifications" class="{{notification.type || 'default' }}" [ngClass]="{'animate': notification.notify}" (mouseenter)="clear()" (click)="notification.notify = !notification.notify">
            {{ notification.message }}
        </li>
    </ul>
    `,
})

export class Ng2Notify {
    private notifications = [];
    public corner;
    
    constructor (public notification: Ng2NotifyService) {
        this.notification.notify.subscribe(uploaded => {
            this.setNotify(uploaded);
        });
    };
    
    private clear(obj) {
        clearTimeout(obj);
    }
    
    private createTimeout(notification) {
        notification.timeout = setTimeout(() => {
            notification.notify = !notification.notify;
            setTimeout(() => {
                this.notifications.shift();
            }, 500);
        }, notification.delay);
    }
    
    private setNotify(obj) {
        obj.notify = true;
        obj.message = obj.message;

        this.corner = obj.corner;
        
        this.notifications.push(obj);
        this.createTimeout(obj);
    }
}