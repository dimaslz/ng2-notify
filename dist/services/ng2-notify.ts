import {Injectable} from "angular2/core";
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';

@Injectable()
export class Ng2NotifyService {
    notify: Observable<Object>;
    private notifyObserver: any;
    private position:string;
    
    constructor() {
        this.notify = new Observable(observer => this.notifyObserver = observer).share();
    };
    
    show(type:String, message:String) {
        this.notifyObserver.next({type: type, message: message, show:true, position:this.position}); 
    }
    
    config(position:string) {
        this.position = position;
    }
}