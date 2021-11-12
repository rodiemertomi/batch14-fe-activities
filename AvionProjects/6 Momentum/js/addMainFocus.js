var mainFocusField = document.getElementById('mainFocus');
var goButton = document.getElementById('go');
var greeting = document.getElementById('greeting');
var mainFocus = document.createElement('h1');
greeting.appendChild(mainFocus);

goButton.addEventListener('click', () => {
    mainFocus.innerHTML = `Your Main Focus is:
    ${mainFocusField.value}`;
})