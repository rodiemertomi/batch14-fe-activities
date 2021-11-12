function renderTime(){

    var myCalendar = new Date();
    var year = myCalendar.getFullYear();
        if(year < 1000){
            year += 1900;
        }
    var day = myCalendar.getDay();
    var month = myCalendar.getMonth();
    var dayM = myCalendar.getDate();
    var dayArray = new Array("Sunday,", "Monday,", "Tuesday,", "Wednesday,", "Thursday,", "Friday,", "Saturday,");
    var monthArray = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");

    var currentTime = new Date();
    var hours = currentTime.getHours();
    var mins = currentTime.getMinutes();
    var sec = currentTime.getSeconds();
        if(hours == 24){
            hours = 0;
        }else if(hours > 12){
            hours = hours - 0;
        }

        if(hours < 10){
            hours = "0"+hours;
        }
        if(mins < 10){
            mins = "0"+mins;
        }
        if(sec < 10){
            sec = "0"+sec;
        }

    var firstLine = document.getElementById('first-line');
    firstLine.innerText = ""+dayArray[day]

    var secondLine = document.getElementById('second-line');
    secondLine.innerText = ""+monthArray[month] + " " + dayM + ", " + year;
    
    var thirdLine = document.getElementById('third-line');
    thirdLine.innerText = ""+hours + ":" + mins + ":" + sec;

    setTimeout("renderTime()", 1000);
}
renderTime();