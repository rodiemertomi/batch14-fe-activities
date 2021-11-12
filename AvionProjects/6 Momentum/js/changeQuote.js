var quote = document.getElementById('quote');
var quotee = document.getElementById('quotee');

let randQuote = Math.floor((Math.random() * allQuotes.length))

quote.textContent = `${allQuotes[randQuote].quote}`;
quotee.textContent = `${allQuotes[randQuote].quotee}`;


function changeQuote(){
    let randQuote = Math.floor((Math.random() * allQuotes.length))

    quote.textContent = `${allQuotes[randQuote].quote}`;
    quotee.textContent = `${allQuotes[randQuote].quotee}`;
}

setInterval(changeQuote, 15000)