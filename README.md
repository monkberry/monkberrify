# Monkberrify

```
npm install monkberrify --save
```

## Example

If your are using Gulp:

```js
gulp.task('default', function() {
  gulp.src('app.js')
    .pipe(browserify({
      transform: [monkberrify],
      debug: true
    }))
    .pipe(rename('bundle.js'))
    .pipe(gulp.dest('.'))
});
```

app.js:

```js
var Monkberry = require('monkberry');
var Template = require('./view.monk');

var view = Monkberry.render(Template, document.body);
```

By default monkberrify will apply to `.monk` files. To add your own extension override pattern:

```js
monkberrify.pattern = /\.monk$/;
```
