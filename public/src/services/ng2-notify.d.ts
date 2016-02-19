import { Observable } from 'rxjs/Observable';
export declare class Ng2NotifyService {
    notify: Observable<Object>;
    private notifyObserver;
    private corner;
    private delay;
    private positionTypes;
    constructor();
    show(type: string, config: any): void;
    config(config: any): void;
}
