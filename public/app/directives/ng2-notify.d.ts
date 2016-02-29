/// <reference path="../../../github/ng2-notify/typings/browser.d.ts" />
import { Ng2NotifyService } from '../services/ng2-notify';
export declare class Ng2Notify {
    notifyService: Ng2NotifyService;
    notifications: any;
    corner: string;
    constructor(notifyService: Ng2NotifyService);
    createTimeout(notification: any): void;
    setNotify(obj: any): void;
}
