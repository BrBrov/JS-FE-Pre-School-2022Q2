let {log} = console;

let langSetting = {
    eng: {
        weekday: {
            0: "Sunday",
            1: "Monday",
            2: "Tuesday",
            3: "Wednesday",
            4: "Thursday",
            5: "Friday",
            6: "Saturday"
        },
        month: {
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
        },
        timeOfDay: ['Good Morning, ', 'Good Afternoon, ', 'Good Evening, ', 'Good Night, '],
        defaultName: 'Stranger'
    }
}
let setting = {
    lang: 'eng',
    location: '',
    name:''
}
function getTimeOfDay(hour, lang) {
    let nameOfTime = langSetting[lang].timeOfDay;
    if (hour >= 6 && hour < 12) {
        return nameOfTime[0]
    } else if (hour >= 12 && hour < 18) {
        return nameOfTime[1]
    } else if (hour >= 18) {
        return nameOfTime[2]
    } else if (hour >= 0 && hour < 6) {
        return nameOfTime[3]
    }
}

window.onload = () => {
    if (localStorage.getItem('settings')) {
        let a = localStorage.getItem('settings');
        setting =JSON.parse(a);
    } else {
        localStorage.setItem('settings', JSON.stringify(setting));
    }
    let time = document.querySelector('.time');
    let todayDate = document.querySelector('.date');
    let greeting = document.querySelector('.greeting');
    let name = document.querySelector('.name');
    let hoursControl = null;

    log(localStorage.getItem('settings'));

    // let a = navigator.geolocation;
    // let optPos = {
    //     enableHighAccuracy: true,
    //     timeout: 3000
    // }
    // let pos = undefined;
    //
    // let geo = new Promise((resolve, reject)=>{
    //         a.getCurrentPosition((posit)=>{resolve(posit)},
    //             (err)=>{reject(err)}, opt);
    //     })
    //     geo.then((data)=>{pos = data})
    //     geo.catch((err)=>{pos = err})
    //
    // log(pos);

    let timeDayEvent = new CustomEvent('greeting');
    greeting.addEventListener('greeting', () => {
        greeting.textContent = getTimeOfDay(hoursControl, setting.lang);
        if(name.value === ''){
            if(localStorage.getItem('settings')){
                name.value = setting.name;
            }else{
            name.value = 'STRANGER';
            setTimeout(()=>{
                name.value = '';
                name.setAttribute('placeholder','ENTER NAME')
            },3000)
        }}
    });

    name.addEventListener('blur', () => {
        setting.name = name.value;
        localStorage.setItem('settings', JSON.stringify(setting));
    });

    setInterval(() => {
        const date = new Date;
        let seconds = date.getSeconds();
        let minutes = date.getMinutes();
        let hours = date.getHours();
        if (hours !== hoursControl || hours === null) {
            hoursControl = hours;
            greeting.dispatchEvent(timeDayEvent);
        }
        if (seconds < 10) {
            seconds = '0' + seconds;
        }
        if (minutes < 10) {
            minutes = '0' + minutes;
        }
        if (hours < 10) {
            hours = '0' + hours;
        }
        let lang = setting.lang;
        time.textContent = hours + ':' + minutes + ':' + seconds;
        todayDate.textContent = langSetting[lang].weekday[date.getDay()] + ', ' + langSetting[lang].month[date.getMonth()] + ' ' + date.getDate();
    }, 1000)


}