# No rights reserved, this piece of art is released as public domain
text = 'No matter how many times, repeat'
errors = 'abcdefghijklmnopqrstuvwxyz0123456789abcdefghijklmnopqrstuvwxyz0123456789!"#€%&/()=,.;:+    '
char = 0
c = null
d = null
p = null

options =
  interval: 70
  variance: 0.3
  errors: 0.05
  errorDelay: 500
  
container = document.getElementById('repeat')

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
  
  if char > 0
    foo = 'bar'
    # @TODO: check if the previous character was correct
  
  if char >= text.length
    d = document.createElement('br')
    container.appendChild(d)
    char = 0
    setTimeout addChar, delay * 10
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
  container.appendChild(d)
  char++
  setTimeout addChar, delay
  
  p = c
addChar()
