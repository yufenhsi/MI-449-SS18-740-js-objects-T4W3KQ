// ----
// DATA
// ----

// A couple jokes to start with
var jokes = {
  'the horse': {
    setup: 'A horse walks into the bar. The bartender asks...',
    punchline: 'Why the long face?'
  },
  'Orion\'s pants': {
    setup: 'How does Orion keep his pants up?',
    punchline: 'With an asteroid belt.'
  }
}

// The message to display if the jokes object is empty
var noJokesMessage = 'I... I don\'t know any jokes. 😢'

// -------------
// PAGE UPDATERS
// -------------

// Update the listed jokes, based on the jokes object
var jokesMenuList = document.getElementById('jokes-menu')
var updateJokesMenu = function () {
  // Don't worry too much about this code for now.
  // You'll learn how to do advanced stuff like
  // this in a later lesson.
  var jokeKeys = Object.keys(jokes)
  var jokeKeyListItems = jokeKeys.join('</li><li>') || noJokesMessage
  jokesMenuList.innerHTML = '<li>' + jokeKeyListItems + '</li>'
}

var saveButton = document.getElementById('save')
document.getElementById('tellJoke').value = window.localStorage.getItem('tellJoke')
document.getElementById('tellSetup').value = window.localStorage.getItem('tellSetup')
document.getElementById('tellPunchline').value = window.localStorage.getItem('tellPunchline')

var saveNewJoke = function () {
  var tellJoke = document.getElementById('tellJoke').value
  window.localStorage.setItem('tellJoke', tellJoke)
  var tellSetup = document.getElementById('tellSetup').value
  window.localStorage.setItem('tellSetup', tellSetup)
  var tellPunchline = document.getElementById('tellPunchline').value
  window.localStorage.setItem('tellPunchline', tellPunchline)
}
saveButton.addEventListener('click', saveNewJoke)

var clearButton = document.getElementById('clear')
document.getElementById('removedJoke').value = window.localStorage.getItem('removedJoke')

var clearNewJoke = function () {
  var removedJoke = document.getElementById('removedJoke').value
  window.localStorage.setItem('removedJoke', removedJoke)
  window.localStorage.clear()
}
clearButton.addEventListener('click', clearNewJoke)

// Update the displayed joke, based on the requested joke
var requestedJokeInput = document.getElementById('requested-joke')
var jokeBox = document.getElementById('joke-box')
var jokeResult = document.getElementById('setup-display')
var punchlineResult = document.getElementById('punchline-display')
var updateDisplayedJoke = function () {
  var requestedJokeKey = requestedJokeInput.value
  jokeBox.textContent = requestedJokeKey
  if (requestedJokeKey === 'the horse') {
    jokeResult.textContent = jokes['the horse'].setup
    punchlineResult.textContent = jokes['the horse'].punchline
  } else if (requestedJokeKey === 'Orion\'s pants') {
    jokeResult.textContent = jokes['Orion\'s pants'].setup
    punchlineResult.textContent = jokes['Orion\'s pants'].punchline
  } else {
    jokeBox.textContent = 'No matching joke found.'
  }
}

// Function to keep track of all other
// page update functions, so that we
// can call them all at once
var updatePage = function () {
  updateJokesMenu()
  updateDisplayedJoke()
}

// -------
// STARTUP
// -------

// Update the page immediately on startup
updatePage()

// ---------------
// EVENT LISTENERS
// ---------------

// Keep the requested joke up-to-date
requestedJokeInput.addEventListener('input', updateDisplayedJoke)
jokeResult.addEventListener('input', updateDisplayedJoke)
punchlineResult.addEventListener('input', updateDisplayedJoke)
