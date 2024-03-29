﻿
# appui Module

## Objects
The Menu and Dialog symbols are added to be used by the factories.
You would most likely not use this objects directly.

### window
A reference to the browser's window object.
While window is globally available in JavaScript, it causes testability problems, because it is a global variable.


### appuiMenu
The Menu symbol from Menu.js used by the menuFactory.

### appuiDialog
The Dialog symbol from Dialog.js used by the dialogFactory.



## Services

### console
A reference to a console object that can be used to log to messages to the browser console.

#### log
`console.log(args);`

Logs information to the console.

#### warn
`console.warn(args);`

Logs a warning to the console.

#### error
`console.error(args);`

Logs an error to the console.


### globalCache
A nice wrapper to the `globals` object exposed by app.js.
All variables are stored in a globalCache variable on globals for added safety.
`globals.globalCache[name]`.

#### get
`globalCache.get(name);`
Gets a global variable from the global cache.

#### set
`globalCache.set(name, value);`
Sets a global variable in the global cache.



### appurl
Use this to help with application urls where the root may be dynamic.
The appurl service depends on a baseUrl to be registered.

```js
myApp.register("baseUrl", "/myApp");
myApp.start(function (appurl) {
	var url = appurl.get("my/url.txt");
	// url = "/myApp/my/url.txt"
});
```

#### get
<code>appurl.get(url)</code>

Prepends the baseUrl to the url and returns it.



### menuFactory
Use this to create a menu.
The menu wraps an element in a menu with a few options for configuration.

#### create
<code>menuFactory.create(el, options);</code>

* el - the element to wrap
* options
	* transition - "none", "fade", "slide"


### dialogFactory
Use this to create a dialog.
The dialog wraps an element in a dialog with a few options for configuration.

#### create
<code>dialogFactory.create(el, options);</code>

* el - the element to wrap
* options
	* title
	* transition - "none", "fade", "slide", "fadein"
	* modal - default is true
	* draggable - default is true (if jquery.ui.draggable exists)
	* position - jquery.ui.position options (the default is center of the window).
	* editorFor - An element that is being edited by the dialog (sets modal to true, draggable to false, and handles the positioning).
	* removeEl - removes the element when the dialog is closed. The default is true.
	             If false, the original element will be placed back into it's parent on close.
	* appendTo - An optional element to append to (other than the body).

<strong>Dialog close attribute</strong>
Any element with a data-rel attribute set to back ([data-rel=back]) will
close the dialog when clicked.

