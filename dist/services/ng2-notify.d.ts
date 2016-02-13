import { Observable } from 'rxjs/Observable';
export declare class Ng2NotifyService {
    notify: Observable<Object>;
    private notifyObserver;
    private position;
    constructor();
    show(type: String, message: String): void;
    config(position: string): void;
}
