Use the style sheet to create a Harmony Dev DAO app.
It's plain CSS so you can use the framework of your liking, and
just have to provide the correct class names.

There are some JS files for easy integration of some components
that you may also just link into your component. See [Plugins](#plugins) for more in information.

---

## Contents

  + [Setup](#setup)
  + [Components](#components)
  + [Plugins](#plugins)
  + [Frameworks](#frameworks)

---

<h2 id="setup">Setup</h2>

<span>1.</span> Link the styles
```html
<link rel="stylesheet" href="https://harmony-devdao.github.io/hdd-style/css/harmony-dev-dao-style.css">
```

<span>2. (optional) </span>Link all the framework CDNs you need, there are some useful ones listed at [Frameworks](#frameworks)

```html
<script src="https://cdn.ethers.io/lib/ethers-5.2.umd.min.js"
        type="application/javascript"></script>
```

<span>3. (optional) </span>Link all the plugin files you need
```html
    <script src="https://harmony-devdao.github.io/hdd-style/js/notification.js"></script>
    ...
```

<span>3. (optional) </span>Implement your app code
```html
    <script>
        // My awesome app
        // ...
    </script>
```

### Example
Your app will look something like this

```HTML
<html>
    <head>
        ... <!-- Head content -->
            <link rel="stylesheet" href="https://harmony-devdao.github.io/hdd-style/css/harmony-dev-dao-style.css">
    </head>
    <body>
        <main>
            <div id="app">
                ... <!-- Your application HTML -->
            </div>
        </main>
        <!-- Load framework scripts here -->
        <script src="https://cdn.ethers.io/lib/ethers-5.2.umd.min.js"
        type="application/javascript"></script>

        <!-- Load plugin scripts here -->
        <script src="https://harmony-devdao.github.io/hdd-style/js/notification.js"></script>
    
        <script>
                /* Your application JavaScript */
        </script>
    </body>
</html>
```



<h2 id="components">Components</h2>


### Button
Displays a styled button.
```HTML
<div class="button">Button Text</div>
```
### Async Button
Displays a spinner when `.waiting` is set.

```html
<div class="button async-button [? waiting]">
    <div class="spinner">
        Button Text
    </div>
```

### Button Group
Formatted horizontal layout for buttons.
```HTML
<div class="button-group">
    <div class="button">Button 1</div>
    <div class="button">Button 2</div>
    <div class="button">Button 3</div>
</div>
```

### Notification
Display a fixed notification at the top right corner.

```HTML
<div class="notification [info* | success | warn | error ] [? hidden] [? removing]">
    <p class="message">
        ...Your Message
        </p>
</div>
```

You can programatically hide the notification and show it by removing the hidden class.
When you hide it again, you can remove it using the removing class, which will collapse the items height. Afterwards it can be removed safely.

### Notification Group
When using notifications, you should put all notifications in a group that manages them
```HTML
<div class="notifications">
    <div class="notification [...]">...</div>
    <div class="notification [...]">...</div>
    <div class="notification [...]">...</div>
    ...
</div>
```


<h2 id="plugins">Plugins</h2>

### Button

```html
<script src="https://harmony-devdao.github.io/hdd-style/js/button.js"></script>
```

**Button.startWaiting(button):**

Set's a `async-button` to waiting state.

**Button.stopWaiting(button):**

Removes a `async-button`'s waiting state.

**Button.waitForPromise(button, promise):**

Set's the waiting state of a button until the promise is resolved or rejected.

### Notifications

Popups notifications of various types.

```html
<script src="https://harmony-devdao.github.io/hdd-style/js/notification.js"></script>
```

**Notification.Type:** 

Enum-like structure to be called with `notify()` with values:
INFO, SUCCESS, WARN, ERROR

**Notification.notify(_msg_, { type=Type.INFO, duration=3000}):**

Popups a notification that prints the text provided with `msg` and has a style according to `type` for the duration of `duration`.

<h2 id="frameworks">Frameworks</h2>

List of useful framework CDNs. 

_Feel free to update and create a pull request!_


<h3 id="wallet-plugin">Wallet</h3>

Provides basic MetaMask integration to a website.
Automatically handles:

+ Account change
+ Chain change
+ Has a list of permitted chains

**new Wallet():**

Creates a new Wallet instance. The instance is also aliased in `Wallet.instance`.

**Wallet.instance.buttonConnect():**

When the wallet is not connected to the website, a connect button can call this to initiate the connection process.

**Wallet.instance.changeChain():**

Can initiate changing/adding of a chain by e.g. clicking a button.

### Ethers JS
```html
<script src="https://cdn.ethers.io/lib/ethers-5.2.umd.min.js"
        type="application/javascript"></script>
```