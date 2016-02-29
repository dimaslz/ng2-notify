import {Injectable} from 'angular2/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';

@Injectable()
export class Ng2NotifyService {
	public notify: Observable<Object>;
	public notifyObserver: any;
	public corner: string = 'right-bottom';
	public delay: number = 2000;

	public positionTypes = ['right-bottom', 'left-bottom', 'left-top', 'right-top'];

	constructor() {
		this.notify = new Observable(observer => this.notifyObserver = observer).share();
	};

	public show(type: string, config) {
		if (!config.message) {
			console.error('ng2NotifyError: You must to set a message!!');
			return false;
		}

		if (config.delay && !Number(config.delay)) {
			console.error('ng2NotifyError: ', `The delay \"${config.delay}\" must be a number`);
			return false;
		}

		this.notifyObserver.next({
			type: type,
			message: config.message,
			corner: config.corner ? config.corner : this.corner,
			delay: config.delay ? config.delay : this.delay
		});
	}

	public config(config) {
		if (this.positionTypes.indexOf(config.corner) === -1) {
			console.error('ng2NotifyError: ', `The corner \"${config.corner}\" do not exist`);
		}

		if (!Number(config.delay)) {
			console.error('ng2NotifyError: ', `The delay \"${config.delay}\" must be a number`);
		}
		this.corner = config.corner || 'right-bottom';
		this.delay = config.delay || this.delay;
	}
}