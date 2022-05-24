Use the style sheet to create a Harmony Dev DAO app.
It's plain CSS so you can use the framework of your liking, and
just have to provide the correct class names.

## Setup

```HTML
<html>
    <head>
        ... <!-- Head content -->
        <link rel="stylesheet" href="css/harmony-dev-dao-style.css">
    </head>
    <body>
         <header>
            <img src="./images/harmony-dev-dao-logo.png" />
        </header>
        <main>
            <div id="app">
                ... <!-- Your application -->
            </div>
        </main>
    </body>
</html>
```

## Components

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