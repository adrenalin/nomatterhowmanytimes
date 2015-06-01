(function() {
  $(function() {
    var addChar, c, char, container, d, errors, options, p, removeChar, removeCharDelay, row, text;
    text = 'No matter how many times, repeat';
    errors = 'abcdefghijklmnopqrstuvwxyz0123456789abcdefghijklmnopqrstuvwxyz0123456789!"#€%&/()=,.;:+    ';
    char = 0;
    c = null;
    d = null;
    p = null;
    row = null;
    options = {
      interval: 120,
      variance: 0.3,
      errors: 0.05,
      errorDelay: 500,
      rowDelay: 700
    };
    if (window.location.hash === '#debug') {
      options.interval = 7;
      options.errors = 0.001;
      options.rowDelay = options.interval;
    }
    container = $('#repeat');
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
      var delay, dy, foo, i, j, mTop, r, ref, rows, seed;
      delay = options.interval * (1 - options.variance * (Math.random() - 0.5));
      if (!row) {
        row = $('<div />').addClass('row').appendTo(container);
      }
      if (char > 0) {
        foo = 'bar';
      }
      if (char >= text.length) {
        char = 0;
        setTimeout(addChar, options.rowDelay);
        rows = $('.row');
        for (i = j = 0, ref = rows.length; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
          r = rows.eq(i);
          if (r.offset().top <= -1 * r.height()) {
            r.remove();
            continue;
          }
          mTop = -1 * (r.nextAll('.row').length + 1) * r.height();
          dy = 2 * r.offset().top / $(window).height();
          r.css({
            marginTop: mTop + "px"
          });
        }
        row = null;
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
      row.append(d);
      char++;
      setTimeout(addChar, delay);
      return p = c;
    };
    return addChar();
  });

}).call(this);

//# sourceMappingURL=repeat.js.map
