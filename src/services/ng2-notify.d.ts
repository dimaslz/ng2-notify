import { Observable } from 'rxjs/Observable';
export declare class Ng2NotifyService {
    notify: Observable<Object>;
    private notifyObserver;
    private position;
    private duration;
    constructor();
    show(type: string, message: string): void;
    config(position?: string, duration?: number): void;
}
