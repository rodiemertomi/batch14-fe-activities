const backgrounds = [
    "url('images/1.jpg')",
    "url('images/2.jpg')",
    "url('images/3.jpg')",
    "url('images/4.jpg')",
    "url('images/5.jpg')",
    "url('images/6.jpg')",
    "url('images/7.jpg')"
];
   
const body = document.querySelector('body');
const bg = backgrounds[Math.floor(Math.random() * backgrounds.length)];
body.style.background = bg;
body.style.backgroundSize = 'cover';
body.style.backgroundRepeat = 'no-repeat';

function changeBg(){
    const bg = backgrounds[Math.floor(Math.random() * backgrounds.length)];
    body.style.background = bg;
    body.style.backgroundSize = 'cover';
    body.style.backgroundRepeat = 'no-repeat';
}

setInterval(changeBg, 20000)