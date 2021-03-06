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
var Observable_1 = require('rxjs/Observable');
require('rxjs/add/operator/share');
require('rxjs/add/operator/map');
var Ng2NotifyService = (function () {
    function Ng2NotifyService() {
        var _this = this;
        this.corner = 'right-bottom';
        this.delay = 2000;
        this.positionTypes = ['right-bottom', 'left-bottom', 'left-top', 'right-top'];
        this.notify = new Observable_1.Observable(function (observer) { return _this.notifyObserver = observer; }).share();
    }
    ;
    Ng2NotifyService.prototype.show = function (type, config) {
        if (!config.message) {
            console.error('ng2NotifyError: You must to set a message!!');
            return false;
        }
        if (config.delay && !Number(config.delay)) {
            console.error('ng2NotifyError: ', "The delay \"" + config.delay + "\" must be a number");
            return false;
        }
        this.notifyObserver.next({
            type: type,
            message: config.message,
            corner: config.corner ? config.corner : this.corner,
            delay: config.delay ? config.delay : this.delay
        });
    };
    Ng2NotifyService.prototype.config = function (config) {
        if (this.positionTypes.indexOf(config.corner) === -1) {
            console.error('ng2NotifyError: ', "The corner \"" + config.corner + "\" do not exist");
        }
        if (!Number(config.delay)) {
            console.error('ng2NotifyError: ', "The delay \"" + config.delay + "\" must be a number");
        }
        this.corner = config.corner || 'right-bottom';
        this.delay = config.delay || this.delay;
    };
    Ng2NotifyService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], Ng2NotifyService);
    return Ng2NotifyService;
}());
exports.Ng2NotifyService = Ng2NotifyService;

//# sourceMappingURL=ng2-notify.js.map
