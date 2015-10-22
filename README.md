# Monkberrify

```
npm install monkberrify --save
```

## Example

If your are using Gulp:

```js
var gulp = require('gulp');
var browserify = require('gulp-browserify');

gulp.task('js', function() {
  gulp.src('app.js', { read: false })
    .pipe(browserify({
      transform: ['monkberrify']
    }))
    .pipe(gulp.dest('.tmp'))
});
```

app.js:

```js
var monkberry = require('monkberry');

monkberry.mount(require('./view.html'));
```

By default monkberrify will apply to `.html` and `.monk` files.
