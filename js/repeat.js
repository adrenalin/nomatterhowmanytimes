// Generated by CoffeeScript 1.9.0
(function() {
  var addChar, c, char, container, d, errors, options, p, removeChar, removeCharDelay, text;

  text = 'No matter how many times, repeat';

  errors = 'abcdefghijklmnopqrstuvwxyz0123456789abcdefghijklmnopqrstuvwxyz0123456789!"#€%&/()=,.;:+    ';

  char = 0;

  c = null;

  d = null;

  p = null;

  options = {
    interval: 70,
    variance: 0.3,
    errors: 0.05,
    errorDelay: 500
  };

  container = document.getElementById('repeat');

  removeCharDelay = function() {
    var errorDelay;
    errorDelay = options.errorDelay * (1 + options.variance * (Math.random() - 0.5));
    return setTimeout(removeChar, errorDelay);
  };

  removeChar = function() {
    var errorDelay;
    char--;
    if (d) {
      d.parentNode.removeChild(d);
      d = null;
    }
    p = text.substr(char - 1, 1);
    errorDelay = options.errorDelay * (1 + options.variance * (Math.random() - 0.5));
    return setTimeout(addChar, errorDelay);
  };

  addChar = function() {
    var delay, foo, seed;
    delay = options.interval * (1 - options.variance * (Math.random() - 0.5));
    if (char > 0) {
      foo = 'bar';
    }
    if (char >= text.length) {
      d = document.createElement('br');
      container.appendChild(d);
      char = 0;
      setTimeout(addChar, delay * 10);
      return;
    }
    if (char && p !== text.substr(char - 1, 1)) {
      removeCharDelay();
      return;
    }
    c = text.substr(char, 1);
    if (char && char < text.length - 1 && Math.random() < options.errors) {
      seed = Math.floor(Math.random() * errors.length);
      c = errors.substr(seed, 1);
    }
    switch (c) {
      case ' ':
        delay = delay * 2;
        break;
      case ',':
        delay = delay * 3;
    }
    d = document.createElement('span');
    d.textContent = c;
    container.appendChild(d);
    char++;
    setTimeout(addChar, delay);
    return p = c;
  };

  addChar();

}).call(this);

//# sourceMappingURL=repeat.js.map
