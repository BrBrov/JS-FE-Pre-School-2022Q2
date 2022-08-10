let {log} = console;
// Language of geolocation:
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
                trackPlay: ''
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

class Position {
    constructor(language) {
        this._updatePlace(language);
    }

    _updatePlace(language) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            let url = `https://nominatim.openstreetmap.org/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json&zoom=10&namedetails=[1]`;
            let response = await fetch(url, {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                    "Accept-Language": language
                }
            })
            let data = await response.json();
            if (data.namedetails) {
                this.place = data.namedetails;
            } else {
                this.place = 'unknown';
            }

        }, (err) => {
            this.place = 'geolocation is blocked';
        }, {enableHighAccuracy: true});
    }

    getPlace(language) {
        return this.place[`name:${language}`];
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
        setTimeout(()=>{
            body.style.backgroundImage = `url(` + img.src + `)`;
        },200);
    }
}

async function getQ(lang){
    let urlq = `https://cors-anywhere.herokuapp.com/https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=`
    if (lang === 'en') {
        urlq = urlq + 'en'
    } else (
        urlq = urlq + 'ru'
    )
    let response = await fetch(urlq, {
        method:'GET',
        mode: 'cors',
        headers:{
            'origin' : 'https://api.forismatic.com',
            'x-requested-with' : 'XMLHttpRequest'
        }
    })
    let j;
    return j = await response.json();
}

function animateBtnQuote(elem){
    let frame = new KeyframeEffect(elem, [
        {transform: 'rotate(0deg)'},
        {transform: 'rotate(720deg)'}
    ],{duration: 1500, fill: 'forwards', easing: 'ease-in-out'});
    return new Animation(frame, document.timeline);
}

let start = async function entry() {
    let date = new DateToday();
    let settings = new SettingStorage();
    let translator = new Translator();
    let position = new Position(settings.getSetting('lang'));

    document.addEventListener('DOMContentLoaded', () => {
        //Variables
        let lang = settings.getSetting('lang');
        let month = translator.getValue(lang, 'month');
        let week = translator.getValue(lang, 'weekday');
        let time = document.querySelector('.time');
        let todayDate = document.querySelector('.date');
        let greeting = document.querySelector('.greeting');
        let name = document.querySelector('.name');
        let body = document.body;
        let prev = document.querySelector('.slide-prev');
        let next = document.querySelector('.slide-next');
        let quoteBtn = document.querySelector('.change-quote');
        let quote = document.querySelector('.quote');
        let author = document.querySelector('.author');

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
            prev.addEventListener('click', () => {
                let url = settings.getSetting('bgimage');
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
            next.addEventListener('click', () => {
                let url = settings.getSetting('bgimage');
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
            quoteSetUp.then(r=>{
                quote.textContent = r.quoteText;
                author.textContent = r.quoteAuthor;
            });

            quoteBtn.addEventListener('click', ()=>{
                let animateClick = animateBtnQuote(quoteBtn);
                animateClick.play();
                let updateQuote = getQ(lang);
                updateQuote.then(r=>{
                    quote.textContent = r.quoteText;
                    author.textContent = r.quoteAuthor;
                })
            })

        })
    })
    // log(position.getPlace('en'))
}

start();





