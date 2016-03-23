///<reference path="../../../typings/browser.d.ts"/>
import {bootstrap} from 'angular2/platform/browser';
import {Component, Input} from 'angular2/core';
import {Ng2NotifyService} from '../services/ng2-notify';

@Component({
	selector: 'ng2-notify',
	template: `
		<ul class="{{corner}}">
			<li *ngFor="#notification of notifications" class="{{notification.type || 'default' }}" [ngClass]="{'animate': notification.notify}">
				{{ notification.message }}
			</li>
		</ul>
	`,
})

export class Ng2Notify {
	public notifications: any;
	public corner: string = null;

	constructor(public notifyService: Ng2NotifyService) {
		this.notifyService.notify.subscribe(uploaded => {
				this.setNotify(uploaded);
		});
		this.notifications = [];
	};

	// private clear(obj) {
	// 	clearTimeout(obj);
	// }

	public createTimeout(notification) {
		notification.timeout = setTimeout(() => {
			notification.notify = !notification.notify;
			setTimeout(() => {
				this.notifications.shift();
			}, 500);
		}, notification.delay);
	}

	public setNotify(obj) {
		obj.notify = true;
		this.corner = obj.corner;
		this.notifications.push(obj);
		this.createTimeout(obj);
	}
}