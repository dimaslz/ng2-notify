var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var browser_1 = require("angular2/platform/browser");
var core_1 = require("angular2/core");
var notify_1 = require('../src/notify');
var App = (function () {
    function App(notification) {
        this.notification = notification;
        this.typeList = '';
        this.position = 'right-bottom';
        this.notification.config(this.position, 5000);
    }
    ;
    App.prototype.notifyDefault = function (message, corner) {
        this.notification.show('', 'test message');
    };
    App.prototype.notifySuccess = function (message, corner) {
        this.notification.show('success', 'test message');
    };
    App.prototype.notifyWarning = function (message, corner) {
        this.notification.show('warning', 'test message');
    };
    App.prototype.notifyError = function (message, corner) {
        this.notification.show('error', 'test message');
    };
    App.prototype.setPosition = function (position) {
        this.position = position;
        this.notification.config(position);
    };
    App = __decorate([
        core_1.Component({
            selector: 'app',
            templateUrl: './app.tpl.html',
            directives: [notify_1.Ng2Notify],
            providers: [notify_1.Ng2NotifyService]
        }), 
        __metadata('design:paramtypes', [notify_1.Ng2NotifyService])
    ], App);
    return App;
})();
browser_1.bootstrap(App, []).catch(console.error);

//# sourceMappingURL=app.js.map
