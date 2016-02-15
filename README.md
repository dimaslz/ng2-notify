#ng2-notify
Notification component for Angular2

###Demo
[http://dimaslz.github.io/ng2-notify](http://dimaslz.github.io/ng2-notify)

###Install
dependencies: `npm install`

watch and enjoi: `gulp watch`

###Use in your project
!Pending tu upload to NPM
At moment, you can use: `npm install --save https://github.com/dimaslz/ng2-notify.git`

in your file:

```javascript
import {Ng2Notify, Ng2NotifyService} from '../src/ng2-notify';
[...]
@Component {
	directives: [Ng2Notify],
	providers: [Ng2NotifyService]
}
export class YourClass {
	constructor(private notifyService) {
		// optional
		this.notifyService.config(NOTIFICATION_POSITION, DELAY);
	}
	
	private myClickExample(message:string) {
	  this.notifyService.show(NOTIFICATION_TYPE, message);
	}
}
```
###Notification positions
* left-top
* right-top
* right-bottom
* left-bottom

###Notification types
**Default type:**
'' or default

**Success type:**
'success'

**Warning type:**
'warning'

**Error type:**
'error'

###TODO
* Add unit tests
* Add e2e test
* Type control
* More animations
* Let me know!
