import { Observable } from 'rxjs/Observable';
export declare class Ng2NotifyService {
    notify: Observable<Object>;
    notifyObserver: any;
    corner: string;
    delay: number;
    positionTypes: string[];
    constructor();
    show(type: string, config: any): boolean;
    config(config: any): void;
}
