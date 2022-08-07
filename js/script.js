let {log} = console;

let langSetting = {
    eng: {
        weekday:{
            0: "Sunday",
            1: "Monday",
            2: "Tuesday",
            3: "Wednesday",
            4: "Thursday",
            5: "Friday",
            6: "Saturday"
        },
        month:{
            0: "January",
            1: "February",
            2: "March",
            3: "April",
            4: "May",
            5: "June",
            6: "July",
            7: "August",
            8: "September",
            9: "October",
            10: "November",
            11: "December"
        }
    }
}

window.onload = () =>{
    let lang = langSetting.eng;

    let time = document.querySelector('.time');
    let todayDate = document.querySelector('.date');



    let clockUpdInterval = setInterval(() => {
        const dateNow = new Date;
        let seconds = dateNow.getUTCSeconds();
        if(seconds < 10){
            seconds = '0' + seconds;
        }
        time.textContent = dateNow.getUTCHours() + ':' + dateNow.getUTCMinutes() + ':' + seconds;
        todayDate.textContent = lang.weekday[dateNow.getDay()] + ',' + lang.month[dateNow.getMonth()] + ' ' +dateNow.getDate();
        log(dateNow.getMonth())
    }, 1000);


}