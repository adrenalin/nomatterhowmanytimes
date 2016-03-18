$ ->
  # No rights reserved, this piece of art is released as public domain
  text = document.title || 'No matter how many times, repeat'
  errors = 'abcdefghijklmnopqrstuvwxyz0123456789abcdefghijklmnopqrstuvwxyz0123456789!"#€%&/()=,.;:+    '
  char = 0
  c = null
  d = null
  p = null
  
  row = null
  
  options =
    interval: 120
    variance: 0.3
    errors: 0.05
    errorDelay: 500
    rowDelay: 700
  
  if window.location.hash is '#debug'
    options.interval = 7
    options.errors = 0.001
    options.rowDelay = options.interval
    
  container = $('#repeat')
  
  removeCharDelay = ->
    errorDelay = options.errorDelay * (1 + options.variance * (Math.random() - 0.5))
    setTimeout removeChar, errorDelay
    
  removeChar = ->
    char--
    if d
      d.parentNode.removeChild d
      d = null
    
    p = text.substr(char - 1, 1)
    errorDelay = options.errorDelay * (1 + options.variance * (Math.random() - 0.5))
    setTimeout addChar, errorDelay
  
  
  addChar = ->
    delay = options.interval * (1  - options.variance * (Math.random() - 0.5))
    
    unless row
      row = $('<div />').addClass('row').appendTo(container)
    
    if char > 0
      foo = 'bar'
      # @TODO: check if the previous character was correct
    
    if char >= text.length
      char = 0
      setTimeout addChar, options.rowDelay
      
      # Check the window height
      rows = $('.row')
      for i in [0...rows.length]
        r = rows.eq(i)
        
        if r.offset().top <= -1 * r.height()
          r.remove()
          continue
        
        mTop = -1 * (r.nextAll('.row').length + 1) * r.height()
        
        dy = 2 * r.offset().top / $(window).height()
        r.css
          #opacity: dy
          marginTop: "#{mTop}px"
        
      row = null
      return
    
    # Check if the previous character is correct
    if char and p isnt text.substr(char - 1, 1)
      removeCharDelay()
      return
    
    c = text.substr(char, 1)
    
    if char and char < text.length - 1 and Math.random() < options.errors
      seed = Math.floor(Math.random() * errors.length)
      c = errors.substr(seed, 1)
    
    switch c
      when ' ' then delay = delay * 2
      when ',' then delay = delay * 3
    
    d = document.createElement('span')
    d.textContent = c
    row.append(d)
    char++
    setTimeout addChar, delay
    
    p = c
  addChar()
