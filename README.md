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
var monkberry = require('monkberry');

monkberry.mount(require('./view.html'));
```

By default monkberrify will apply to `.html` and `.monk` files.
