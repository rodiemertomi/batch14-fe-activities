var nameField = document.getElementById('name');
var setSailButton = document.getElementById('set-sail');
var greetings = document.querySelector('.greeting h1');

setSailButton.addEventListener('click', () =>  {
    greetings.textContent = `Welcome Aboard ${nameField.value}!`;
    setSailButton.style.display = 'none';
    nameField.style.display = 'none';
    document.getElementById('main-focus').style.opacity = 1;
})