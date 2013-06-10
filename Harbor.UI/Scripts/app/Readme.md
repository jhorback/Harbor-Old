
# app.js

Provides Angular like bootstrapping with Backbone like flexibility.

Facilitates the creation of modules and apps.


## Global Methods

#### module(moduleName)
Creates/references the module by name.

```js
var myModule = module("myModule");
myModule.use("someOtherMod");
```

```c#
var test = new Test("hello");
public class Test()
{
}
```

#### app(appName)
Create/references the app by name.

## App and Module Methods

#### module.register(name, value)
A call to register on the internal context object.

#### module.construct(name, creator)
Creates a construct to be used by the module.

#### module.use(moduleDependencies)
Any number of arguments (or an array) of dependent module names.

#### module.config(fn)
Registers a config method to execute before application start.
fn can be injected using the array notation

## Additional App Methods

#### app.start(fn)
Registers a start method to execute after all configuration methods have executed.
fn can be injected using the array notation

#### app.start()
Calling start without arguments 'starts' the app bootstrapping process.

## Services

### context
The ioc container for the app

### register(name, value)
Registers an object with the container.
Value can be any object or a constructor/factory function.

#### get(name)
Retrieves the dependency.

#### call(method, args, context)
A utility method for satisfying the dependencies of a method directly.
The context will be applied to the method call -> 'this'

#### instantiate(constructor, args)
Calls the constructor which can also be the name
of a registered dependency.


### globals
A plain old JavaScript object that is shared accross apps.


## Constructs

### service
A simple call to register.



# context.js
Creates an inversion of control container for JavaScript.
Function dependencies are determined by their arguments, however, for obfusticated scripts
an $inject property can be placed on the prototype or function itself.

## Methods

### context.create()
Creates a new container.

## Context Methods

### register(name, value)
Registers an object with the container.
Value can be any object or a constructor/factory function.

### get(name)
Retrieves the dependency.

### call(method, args, context)
A utility method for satisfying the dependencies of a method directly.
The context will be applied to the method call -> 'this'

### instantiate(constructor, args)
Calls the constructor which can also be the name
of a registered dependency.
