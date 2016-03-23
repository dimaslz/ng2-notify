"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('angular2/core');
var ng2_notify_1 = require('../services/ng2-notify');
var Ng2Notify = (function () {
    function Ng2Notify(notifyService) {
        var _this = this;
        this.notifyService = notifyService;
        this.corner = null;
        this.notifyService.notify.subscribe(function (uploaded) {
            _this.setNotify(uploaded);
        });
        this.notifications = [];
    }
    ;
    Ng2Notify.prototype.createTimeout = function (notification) {
        var _this = this;
        notification.timeout = setTimeout(function () {
            notification.notify = !notification.notify;
            setTimeout(function () {
                _this.notifications.shift();
            }, 500);
        }, notification.delay);
    };
    Ng2Notify.prototype.setNotify = function (obj) {
        obj.notify = true;
        this.corner = obj.corner;
        this.notifications.push(obj);
        this.createTimeout(obj);
    };
    Ng2Notify = __decorate([
        core_1.Component({
            selector: 'ng2-notify',
            template: "\n\t\t<ul class=\"{{corner}}\">\n\t\t\t<li *ngFor=\"#notification of notifications\" class=\"{{notification.type || 'default' }}\" [ngClass]=\"{'animate': notification.notify}\">\n\t\t\t\t{{ notification.message }}\n\t\t\t</li>\n\t\t</ul>\n\t",
        }), 
        __metadata('design:paramtypes', [ng2_notify_1.Ng2NotifyService])
    ], Ng2Notify);
    return Ng2Notify;
}());
exports.Ng2Notify = Ng2Notify;

//# sourceMappingURL=ng2-notify.js.map
