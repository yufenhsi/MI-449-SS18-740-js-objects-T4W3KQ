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
var saveNewJoke = function () {
  var tellJoke = document.getElementById('tellJoke').value
  var tellSetup = document.getElementById('tellSetup').value
  var tellPunchline = document.getElementById('tellPunchline').value
  jokes[tellJoke] = {
    setup: tellSetup,
    punchline: tellPunchline
  }
  var stringifiedJokes = JSON.stringify(jokes)
  window.localStorage.setItem('jokes', stringifiedJokes)
  updatePage()
}
saveButton.addEventListener('click', saveNewJoke)

var clearButton = document.getElementById('clear')
var clearJoke = function () {
  var unlikeReason = document.getElementById('removedJoke').value
  delete jokes[unlikeReason]
  var stringifiedJokes = JSON.stringify(jokes)
  window.localStorage.setItem('jokes', stringifiedJokes)
  updatePage()
}
clearButton.addEventListener('click', clearJoke)

// Update the displayed joke, based on the requested joke
var requestedJokeInput = document.getElementById('requested-joke')
var jokeBox = document.getElementById('joke-box')
var updateDisplayedJoke = function () {
  var joke = jokes[requestedJokeInput.value]
  if (joke) {
    jokeBox.innerHTML = '<p>' + joke.setup + '<p>' + '</p>' + joke.punchline + '</p>'
  } else {
    jokeBox.innerHTML = 'No matching joke found.'
  }
}

// Function to keep track of all other
// page update functions, so that we
// can call them all at once
var updatePage = function () {
  var stringifiedJokes = window.localStorage.getItem('jokes')
  if (stringifiedJokes) {
    jokes = JSON.parse(stringifiedJokes)
  }
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
