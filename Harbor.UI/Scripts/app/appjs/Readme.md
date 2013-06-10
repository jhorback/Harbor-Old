
# appjs Module

## Objects

### window
A reference to the browser's window object.
While window is globally available in JavaScript, it causes testability problems, because it is a global variable.



## Services


### console
A reference to a console object that can be used to log to messages to the browser console.

#### log
<code>console.log(args);</code>

Logs information to the console.

#### warn
<code>console.warn(args);</code>

Logs a warning to the console.

#### error
<code>console.error(args);</code>

Logs an error to the console.


### globalCache
A nice wrapper to the <code>globals</code> object exposed by app.js.
All variables are stored in a globalCache variable on globals for added safety.
<code>globals.globalCache[name]</code>.

#### get
<code>globalCache.get(name);</code>
Gets a global variable from the global cache.

#### set
<code>globalCache.set(name, value);</code>
Sets a global variable in the global cache.

