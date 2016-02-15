import {bootstrap} from "angular2/platform/browser";
import {Component, View, OnInit} from "angular2/core";
import {Ng2Notify, Ng2NotifyService} from '../src/ng2-notify';

@Component({
    selector: 'app',
    templateUrl: './app.tpl.html',
    directives: [Ng2Notify],
    providers: [Ng2NotifyService]
})

class App {
    public typeList = '';
    public componentTodos;
    socket: any;
    messages: Array<String>;
    private position:string = 'right-bottom';
    
    constructor(public notification: Ng2NotifyService) {
        this.notification.config(this.position, 5000);
    };
    
    private notifyDefault(message, corner) {
        this.notification.show('', 'test message');
    }
    
    private notifySuccess(message, corner) {
        this.notification.show('success', 'test message');
    }
    
    private notifyWarning(message, corner) {
        this.notification.show('warning', 'test message');
    }
    
    private notifyError(message, corner) {
        this.notification.show('error', 'test message');
    }
    
    private setPosition(position:string) {
        this.position = position;
        this.notification.config(position);
    }
    
}

bootstrap(App, []).catch(console.error);