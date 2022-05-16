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
            ... <!-- Your application -->
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