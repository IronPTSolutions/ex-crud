const hbs = require('hbs');

hbs.registerHelper('hasCategory', function(book, category, options) {
  if(book.categories.includes(category)) {
    return options.fn(this)
  } else {
    return options.inverse(this) 
  }
});

hbs.registerHelper('isMainCategory', function (book, category, options) {
  if (book.mainCategory === category) {
    return options.fn(this)
  } else {
    return options.inverse(this)
  }
});
