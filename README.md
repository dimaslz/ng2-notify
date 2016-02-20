[![npm version](https://badge.fury.io/js/ng2-notify.svg)](https://badge.fury.io/js/ng2-notify)

#ng2-notify
Notification component for Angular2

###Demo
[http://dimaslz.github.io/ng2-notify](http://dimaslz.github.io/ng2-notify)

###Install
dependencies: `npm install`

watch and enjoi: `gulp watch`

###Use in your project
`npm install --save ng2-notify`

in your file:

```javascript
import {Ng2Notify, Ng2NotifyService} from 'ng2-notify/notify';
[...]
@Component {
	directives: [Ng2Notify],
	providers: [Ng2NotifyService]
}
export class YourClass {
	constructor(private notifyService: Ng2NotifyService) {
		// optional
		this.notifyService.config({
            corner: 'right-bottom', 
            delay: 5000 // milisecons
        });
	}
	
	private myClickExample(message:string) {
	  this.notifyService.show('default', {
	  	message: 'Type your message here!'
	  });
	}
}

Note: You can show a demo in **app/examples/app.ts**
```
###Notification corners
* left-top
* right-top
* right-bottom
* left-bottom

###Notification types
**Default type:**
'default'

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

###Author
Dimas López ([dimaslz](http://twitter.com/dimaslz)) · Software developer  
[http://dimaslz.io](http://dimaslz.io) · [http://dimaslz.com](http://dimaslz.com)

## License

The MIT License (MIT)

Copyright (c) 2015 Dimas López <dimaslopezzurita@gmail.com>
[@dimaslz](http://twitter.com/dimaslz) [http://dimaslz.io](http://dimaslz.io) [http://dimaslz.com](http://dimaslz.com)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.