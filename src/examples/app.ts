import {bootstrap} from 'angular2/platform/browser';
import {Component, OnInit} from 'angular2/core';
import {Ng2Notify, Ng2NotifyService} from '../app/notify';

@Component({
	selector: 'app, div[app]',
	templateUrl: './app.tpl.html',
	directives: [Ng2Notify],
	providers: [Ng2NotifyService]
})

class App {
	public typeList = '';
	public componentTodos;
	socket: any;
	messages: Array<String>;
	private corner: string = 'right-top';

	constructor(public notification: Ng2NotifyService) {
		// Custom default config
		this.notification.config({
			corner: this.corner,
			delay: 5000
		});
	};

	private notifyDefault(): void {
		this.notification.show('default', {
			message: 'Default notification.'
		});
	}

	private notifySuccess(message, corner) {
		this.notification.show('success', {
			message: 'Success notification.'
		});
	}

	private notifyWarning(message, corner) {
		this.notification.show('warning', {
			message: 'Warning notification.'
		});
	}

	private notifyError(message, corner) {
		this.notification.show('error', {
			message: 'Error notification.'
		});
	}

	private setPosition(corner: string) {
		this.corner = corner;
		this.notification.config({
			corner: corner,
			delay: 5000
		});
	}
}

bootstrap(App, []).catch(console.error);