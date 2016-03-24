[![npm version](https://badge.fury.io/js/ng2-notify.svg)](https://badge.fury.io/js/ng2-notify)
[![dependency Status](https://david-dm.org/dimaslz/ng2-notify/status.svg)](https://david-dm.org/dimaslz/ng2-notify/status.svg)
[![devDependency Status](https://david-dm.org/dimaslz/ng2-notify/dev-status.svg)](https://david-dm.org/dimaslz/ng2-notify/dev-status.svg)
[![MIT License](http://img.shields.io/badge/license-MIT-brightgreen.svg)](http://img.shields.io/badge/license-MIT-brightgreen.svg)
[![npm](https://img.shields.io/npm/dm/ng2-notify.svg)]()

#ng2-notify
Notification component for Angular2

###Demo
[http://dimaslz.github.io/ng2-notify](http://dimaslz.github.io/ng2-notify)
Also, you can show a implementation into Angular2: [http://todoapp.dimaslz.io/#/tasks/all](http://todoapp.dimaslz.io/#/tasks/all) (github: [https://github.com/dimaslz/todoApp-angular2](https://github.com/dimaslz/todoApp-angular2))

###Install
dependencies: `npm install`

watch and enjoy: `gulp watch`
watch with tests (unit & e2e): `gulp watch:test`

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

Note: You can show a demo in **src/examples/app.ts**
```

Now, in your template, you should add `<ng2-notify></ng2-notify>`, is the tag for print directive in the UI.

###CSS
For css style, import this css into your html `node_modules/ng2-notify/dist/css/ng2notify.css`

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
* ~~Add unit tests~~ √
* ~~Add e2e test~~ √
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