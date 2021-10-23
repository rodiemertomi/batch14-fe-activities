var kbBtns = document.getElementById('buttons');
var kbDiv = document.createElement('div');
var newBtn = document.createElement('button');
newBtn.textContent = 'Change Keyboard';
newBtn.style.border = '1px';
newBtn.style.color = '#1D1D1D';
newBtn.style.margin = '5px';
newBtn.style.padding = '15px 30px';
newBtn.style.borderRadius = '15px';
newBtn.setAttribute('id', 'kb-btn');
console.log(newBtn);

kbDiv.appendChild(newBtn);
kbBtns.appendChild(kbDiv);
var rkala = document.getElementById('rKala');
function newKB(){
    rkala.textContent = 'Redsisiw KALA K557 RGB';
    rkala.style.color = 'red';
}

document.getElementById('kb-btn').addEventListener('click', newKB);