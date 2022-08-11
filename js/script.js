let {log} = console;
// Available language for geolocation:
//     name:be: "Паставы" <-belarus
//     name:be-tarask: "Паставы" <- belarus(tarashkevicha)
//     name:de: "Pastawy"  <- Deutsch
//     name:en: "Pastavy"  <- English
//     name:eo: "Pastavi"
//     name:fr: "Pastavy"  <- France
//     name:lt: "Pastovys" <- Latvia
//     name:pl: "Postawy"  <- Poland
//     name:ru: "Поставы"  <- Russian
//     name:uk: "Постави"  <- Ukraine

class DateToday {
    constructor() {
        this.updateView();
    }

    #dateNow() {
        return this.date = new Date;
    }

    updateView() {
        this.#dateNow();
        this.hours = this.date.getHours();
        this.minute = this.date.getMinutes();
        this.second = this.date.getSeconds();
        this.mounth = this.date.getMonth();
        this.day = this.date.getDay();
        this.number = this.date.getDate();
    }

    getTime() {
        this.updateView();
        let time = {
            hours: this.hours,
            minutes: this.minute,
            seconds: this.second
        };

        for (let timeKey in time) {
            if (time[timeKey] < 10) {
                time[timeKey] = '0' + time[timeKey];
            }
        }
        return time;
    }

    getToday() {
        return {
            day: this.day,
            month: this.mounth,
            number: this.number
        }
    }

    getTimeOfday() {
        if (this.hours >= 6 && this.hours < 12) {
            return 0;
        } else if (this.hours >= 12 && this.hours < 18) {
            return 1;
        } else if (this.hours >= 18) {
            return 2;
        } else if (this.hours >= 0 && this.hours < 6) {
            return 3;
        }
    }
}

class Translator {
    constructor() {
        this.en = {
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
            defaultName: 'Stranger',
            labelOfNameEnter: 'ENTER YOUR NAME'
        }
        this.ru = {
            weekday: {
                0: "Воскресенье",
                1: "Понедельник",
                2: "Вторник",
                3: "Среда",
                4: "Четверг",
                5: "Пятница",
                6: "Суббота"
            },
            month: {
                0: "Январь",
                1: "Февраль",
                2: "Март",
                3: "Апрель",
                4: "Иай",
                5: "Июнь",
                6: "Июль",
                7: "Август",
                8: "Сентябрь",
                9: "Октябрь",
                10: "Ноябрь",
                11: "Декабрь"
            },
            timeOfDay: ['Доброе утро, ', 'Добрый день, ', 'Добрый вечер, ', 'Доброй ночи, '],
            defaultName: 'Странник',
            labelOfNameEnter: 'ВВЕДИТЕ СВОЁ ИМЯ'
        }
        this.be = {
            weekday: {
                0: "Нядзеля",
                1: "Панядзелак",
                2: "Аўторак",
                3: "Серада",
                4: "Чацвер",
                5: "Пятніца",
                6: "Субота"
            },
            month: {
                0: "Студзень",
                1: "Люты",
                2: "Сакавік",
                3: "Красавік",
                4: "Май",
                5: "Чэрвень",
                6: "Ліпень",
                7: "Жнівень",
                8: "Верасень",
                9: "Кастрычнік",
                10: "Лістапад",
                11: "Снежань"
            },
            timeOfDay: ['Добрай раніцы, ', 'Добры дзень, ', 'Добры вечар, ', 'Дабранач, '],
            defaultName: 'Вандроўнік',
            labelOfNameEnter: 'УВЯДЗІЦЕ СВАЁ ІМЯ'
        }
    }

    getValue(language, param) {
        return this[language][param];
    }
}

class SettingStorage {
    constructor() {
        this.#startSetting();
    }

    #startSetting() {
        if (localStorage.getItem('settings')) {
            this.isSetting = true;
            this.setting = JSON.parse(localStorage.getItem('settings'));
        } else {
            this.isSetting = false;
            this.setting = {
                lang: 'en',
                name: '',
                location: 'Minsk',
                bgimage: '../assets/img/bg.jpg',
                trackPlay: '',
                trackTag:'',
                weatherInit: null
            }
            localStorage.setItem('settings', JSON.stringify(this.setting));
        }
    }

    setSetting(param, value) {
        this.setting[param] = value;
        localStorage.setItem('settings', JSON.stringify(this.setting));
        this.isSetting = true;
    }

    getSetting(p) {
        return this.setting[p];
    }

    isSettings() {
        return this.isSetting;
    }

    clearSetting() {
        localStorage.clear();
    }
}

class Coordinates{
    #coords = {};
    constructor() {
        this.#coords = {
            latitude: null,
            longitude: null
        }
    }
    setCoords(latitude, longitude){
        this.#coords.latitude = latitude;
        this.#coords.longitude = longitude;
    }
    getCoords(){
        return this.#coords;
    }
}

function getBGUrl(timeDay) {
    let arr = ['morning', 'afternoon', 'evening', 'night'];
    let randNum = Math.floor(Math.random() * (20 - 1 + 1) + 1);
    if (randNum < 10) {
        randNum = '/0' + randNum;
    } else {
        randNum = '/' + randNum;
    }
    // 'https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/evening/18.jpg'
    // https://github.com/rolling-scopes-school/stage1-tasks/raw/assets/images/afternoon/01.jpg
    return 'https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/' + arr[timeDay] + randNum + '.jpg';
}

function setBgImage(url, body) {
    let img = new Image();
    img.src = url;
    img.onload = () => {
        setTimeout(() => {
            body.style.backgroundImage = `url(` + img.src + `)`;
        }, 200);
    }
}

async function getQ(lang) {
    //https://cors-anywhere.herokuapp.com/https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=
    let url = ``;
    if (lang === 'en') {
        url = url + 'en'
    } else (
        url = url + 'ru'
    )
    let response = await fetch('https://scrappy-php.herokuapp.com/?url=https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=ru');
    return await response.json();
}

function animateBtnQuote(elem) {
    let frame = new KeyframeEffect(elem, [
        {transform: 'rotate(0deg)'},
        {transform: 'rotate(720deg)'}
    ], {duration: 1500, fill: 'forwards', easing: 'ease-in-out'});
    return new Animation(frame, document.timeline);
}

let start = async function entry() {
    let date = new DateToday();
    let settings = new SettingStorage();
    let translator = new Translator();
    let coodinates = new Coordinates();

    document.addEventListener('DOMContentLoaded', () => {
        //Initialization variables

        let lang = settings.getSetting('lang'); //lanquage of app
        log(lang);
        // Clocks variable
        let month = translator.getValue(lang, 'month');
        let week = translator.getValue(lang, 'weekday');
        let time = document.querySelector('.time');
        let todayDate = document.querySelector('.date');
        //Greeting variable
        let greeting = document.querySelector('.greeting');
        let name = document.querySelector('.name');
        //Background image and slider
        let body = document.body;
        let prev = document.querySelector('.slide-prev');
        let next = document.querySelector('.slide-next');
        //Quote block
        let quoteBtn = document.querySelector('.change-quote');
        let quote = document.querySelector('.quote');
        let author = document.querySelector('.author');
        //Widget of weather
        let city = document.querySelector('.city');
        let weatherIcon = document.querySelector('.weather-icon');
        let temperature = document.querySelector('.temperature');
        let description = document.querySelector('.weather-description');
        let wind = document.querySelector('.wind');
        let humidity = document.querySelector('.humidity');
        let weatherErr = document.querySelector('.weather-error');

        //Function get weather from geolocation
        function getWeatherGeolocation(lang){
            return new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition((position) => {
                    coodinates.setCoords(position.coords.latitude, position.coords.longitude);
                    resolve(position);
                }, (err) => {
                    reject(err);
                }, {enableHighAccuracy: true})
            }).then(r => {
                let url = `https://api.openweathermap.org/data/2.5/weather?lat=${r.coords.latitude}&lon=${r.coords.longitude}&exclude=current&appid=1b4d2db9104890bb7966cf30eb259dae&units=metric&lang=${lang}`;
                return fetch(url,{
                    method: 'GET',
                    mode:"cors"
                })
            }).then(response=>{
                return response.json();
            }).then(weather=>{
                city.value = weather.name;
                settings.setSetting('weatherInit', 'initialized');
                settings.setSetting('location', weather.name);
                weatherIcon.classList.add(`owf-${weather.weather[0].id}`);
                temperature.textContent = weather.main.temp + ' ºC';
                description.textContent = weather.weather[0].description;
                wind.textContent = `Wind speed: ${weather.wind.speed} m/s`;
                humidity.textContent =`Humidity: ${weather.main.humidity} %`;
            }).catch(err=>{
                weatherErr.textContent = err.message;
                city.value = 'Enter your location';
            })
        }
        function setWeather(name){
            let setWeather = new Promise((resolve)=>{
                fetch(`https://api.openweathermap.org/data/2.5/weather?q=${name}&exclude=current&appid=1b4d2db9104890bb7966cf30eb259dae&units=metric&lang=${lang}`)
                    .then(response=>{
                        return response.json();
                    }).then(r=>{
                    resolve(r);
                })
            }).then(weather=>{
                city.value = weather.name;
                settings.setSetting('location', weather.name);
                settings.setSetting('weatherInit', 'initialized');
                weatherIcon.classList.add(`owf-${weather.weather[0].id}`);
                temperature.textContent = weather.main.temp + ' ºC';
                description.textContent = weather.weather[0].description;
                wind.textContent = `Wind speed: ${weather.wind.speed} m/s`;
                humidity.textContent =`Humidity: ${weather.main.humidity} %`;
            })
        }

        window.addEventListener('load', () => {

            body.style.background = "url(" + settings.getSetting('bgimage') + ")";

            let timeControll = date.getTime().hours;
            let timeIsChange = new CustomEvent('changetime');

            setInterval(() => {
                let timeData = date.getTime();
                if (timeControll !== timeData.hours) {
                    timeControll = timeData.hours;
                    time.dispatchEvent(timeIsChange);
                }
                time.textContent = timeData.hours + ':' + timeData.minutes + ':' + timeData.seconds;
                let dateToday = date.getToday();
                todayDate.textContent = week[dateToday.day] + ', ' + month[dateToday.month] + ' ' + dateToday.number;

            }, 1000);

            setTimeout(() => {
                greeting.textContent = translator.getValue(lang, 'timeOfDay')[date.getTimeOfday()];
                name.value = settings.getSetting('name') === '' ? translator.getValue(lang, 'defaultName') : settings.getSetting('name');
                if (name.value === translator.getValue(lang, 'defaultName')) {
                    setTimeout(() => {
                        name.value = translator.getValue(lang, 'labelOfNameEnter');
                    }, 2000);
                }
            }, 1050);

            greeting.addEventListener('changetime', () => {
                greeting.textContent = translator.getValue(lang, 'timeOfDay')[date.getTimeOfday()];
            })

            name.addEventListener('blur', () => {
                log(name.value);
                if (name.value === '') {
                    name.value = translator.getValue(lang, 'labelOfNameEnter');
                } else {
                    if (name.value !== translator.getValue(lang, 'labelOfNameEnter')) {
                        settings.setSetting('name', name.value);
                        let url = getBGUrl(date.getTimeOfday());
                        settings.setSetting('bgimage', url);
                        body.style.backgroundImage = url;
                    }
                }
            })
            //Body change img depend on time
            body.addEventListener('changetime', () => {

                let dayTime = date.getTimeOfday();
                let src = getBGUrl(dayTime);
                setBgImage(src, body);
                settings.setSetting('bgimage', src);
            }, true);

            //Slider
            //prev <------
            prev.addEventListener('click', () => {
                let url = settings.getSetting('bgimage');
                if(url === '../assets/img/bg.jpg'){
                    url = getBGUrl(date.getTimeOfday());
                }
                let fileName = Number(url.slice(url.length - 6, url.length - 4));
                url = url.slice(0, url.length - 6);
                if (fileName > 1) {
                    fileName--;
                } else if (fileName === 1) {
                    fileName = 20;
                }
                if (fileName < 10) {
                    fileName = '0' + fileName;
                }
                log(fileName);
                url = url + fileName + '.jpg';
                settings.setSetting('bgimage', url);
                setBgImage(url, body);
            })
            //next----->
            next.addEventListener('click', () => {
                let url = settings.getSetting('bgimage');
                if(url === '../assets/img/bg.jpg'){
                    url = getBGUrl(date.getTimeOfday());
                }
                let fileName = Number(url.slice(url.length - 6, url.length - 4));
                url = url.slice(0, url.length - 6);
                if (fileName < 20) {
                    fileName++;
                } else if (fileName === 20) {
                    fileName = 1;
                }
                if (fileName < 10) {
                    fileName = '0' + fileName;
                }
                log(fileName);
                url = url + fileName + '.jpg';
                settings.setSetting('bgimage', url);
                setBgImage(url, body);
            })

            //Quotes
            // quoteBtn - button for update quote
            // quote - quoteText
            // author - quoteAuthor

            let quoteSetUp = getQ(lang);
            quoteSetUp.then(r => {
                quote.textContent = `${r.quoteText}`;
                author.textContent = `${r.quoteAuthor}`;
            });

            //Update quote

            quoteBtn.addEventListener('click', () => {
                let animateClick = animateBtnQuote(quoteBtn);
                animateClick.play();
                let updateQuote = getQ(lang);
                updateQuote.then(r => {
                    quote.textContent = `${r.quoteText}`;
                    author.textContent = `${r.quoteAuthor}`;
                })
            })

            //Weather widget

            if(settings.getSetting('weatherInit') === null){
                getWeatherGeolocation(lang);
            }else{
                setWeather(settings.getSetting('location'));
            }
            //input place for weather;
            city.addEventListener('blur', ()=>{
                setWeather(city.value);
            });
        });
    })
}

start();





