/// <reference path="../../typings/browser.d.ts" />
import { Ng2NotifyService } from "../services/ng2-notify";
export declare class Ng2Notify {
    notification: Ng2NotifyService;
    private notifications;
    corner: any;
    constructor(notification: Ng2NotifyService);
    private clear(obj);
    private createTimeout(notification);
    private setNotify(obj);
}
