let { log } = console;
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
            setMenu: {
                weather: 'Your place',
                language: 'Choose your language',
                languageArr: ['Belarus', 'Russian', 'English'],
                imgCollection: 'Choose image collection',
                hide: 'Choose to hide',
                hideArr: ['Hide player', 'Hide weather', 'Hide clock', 'Hide date', 'Hide greeting', 'Hide quote'],
                close: 'Close'
            },
            timeOfDay: ['Good Morning, ', 'Good Afternoon, ', 'Good Evening, ', 'Good Night, '],
            defaultName: 'Stranger',
            labelOfNameEnter: 'ENTER NAME',
            tag: 'Enter tag'
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
            setMenu: {
                weather: 'Ваше место',
                language: 'Выберите язык',
                languageArr: ['Белорусский', 'Русский', 'Англиский'],
                imgCollection: 'Выберите источник изображений',
                hide: 'Выберите, что бы спрятать',
                hideArr: ['Спрятать плеер', 'Спрятать погоду', 'Спрятать часы', 'Спрятать дату', 'Спрятать приветствие', 'Спрятать цитаты'],
                close: 'Закрыть'
            },
            timeOfDay: ['Доброе утро, ', 'Добрый день, ', 'Добрый вечер, ', 'Доброй ночи, '],
            defaultName: 'Странник',
            labelOfNameEnter: 'ВВЕДИТЕ ИМЯ',
            tag: 'Введите тэг на англиском'
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
            setMenu: {
                weather: 'Ваша месца',
                language: 'Абярыце мову',
                languageArr: ['Беларускі', 'Рускі', 'Англійскі'],
                imgCollection: 'Вылучыце крыніцу малюнкаў',
                hide: 'Выберыце, што схаваць',
                hideArr: ['Схаваць плэер', 'Схаваць надвор\'е', 'Схаваць гадзіннік', 'Схаваць дату', 'Схаваць прывітанне', 'Схаваць цытаты'],
                close: 'Зачыніць'
            },
            timeOfDay: ['Добрай раніцы, ', 'Добры дзень, ', 'Добры вечар, ', 'Дабранач, '],
            defaultName: 'Вандроўнік',
            labelOfNameEnter: 'УВЯДЗІЦЕ ІМЯ',
            tag: 'Увядзіце тэг на англійскім'
        }
        this.playlist = [{
            path: '../assets/sounds/Black Batty.mp3',
            title: 'Black Batty'
        },
        {
            path: '../assets/sounds/Can\'t Stop.mp3',
            title: 'Can\'t Stop'
        },
        {
            path: '../assets/sounds/Pretty Fly.mp3',
            title: 'Pretty Fly'
        },
        {
            path: '../assets/sounds/Stan.mp3',
            title: 'Stan'
        }];
    }

    getValue(language, param) {
        return this[language][param];
    }

    getPlayList() {
        return this.playlist;
    }
}

class SettingStorage {
    constructor() {
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
                trackPlay: 0,
                songsTimer: 0,
                volume: 50,
                weatherInit: null,
                player: true,
                weather: true,
                clock: true,
                date: true,
                greeting: true,
                quote: true,
                imageSource: '0',
                imgTags: null
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

class Coordinates {
    #coords = {};

    constructor() {
        this.#coords = {
            latitude: null,
            longitude: null
        }
    }

    setCoords(latitude, longitude) {
        this.#coords.latitude = latitude;
        this.#coords.longitude = longitude;
    }

    getCoords() {
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
    return 'https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/' + arr[timeDay] + randNum + '.jpg';
}

function setBgImage(url, body) {
    let img = new Image();
    img.src = url;
    img.onload = () => {
        setTimeout(() => {
            body.style.setProperty('backgroung-repeat', 'no-repeat');
            body.style.backgroundImage = `url(` + img.src + `)`;
        }, 200);
    }
}

async function getQ(lang) {
    //https://scrappy-php.herokuapp.com/?url=https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=ru
    // https://cors-anywhere.herokuapp.com/https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=${lang}
    // let url = ``;
    // if (lang === 'en') {
    //     url = url + 'en'
    // } else (
    //     url = url + 'ru'
    // )
    let response = await fetch(`https://www.breakingbadapi.com/api/quote/random`);
    return await response.json();
}

function animateBtnQuote(elem) {
    let frame = new KeyframeEffect(elem, [
        { transform: 'rotate(0deg)' },
        { transform: 'rotate(720deg)' }
    ], { duration: 1500, fill: 'forwards', easing: 'ease-in-out' });
    return new Animation(frame, document.timeline);
}

let start = async function () {
    let date = new DateToday();
    let settings = new SettingStorage();
    let translator = new Translator();
    let coordinates = new Coordinates();

    document.addEventListener('DOMContentLoaded', () => {
        //Initialization variables
        let flikrGallery = [];
        let lang = settings.getSetting('lang'); //language of app
        let imgsourse = settings.getSetting('imageSource');
        let indexImgNow = 0;
        // Clocks variable
        let month = translator.getValue(lang, 'month');
        let week = translator.getValue(lang, 'weekday');
        let time = document.querySelector('.time');
        let todayDate = document.querySelector('.date');
        //Greeting variable
        let greetingContainer = document.querySelector('.greeting-container');
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
        let weather = document.querySelector('.weather');
        let city = document.querySelector('.city');
        let weatherIcon = document.querySelector('.weather-icon');
        let temperature = document.querySelector('.temperature');
        let description = document.querySelector('.weather-description');
        let wind = document.querySelector('.wind');
        let humidity = document.querySelector('.humidity');
        let weatherErr = document.querySelector('.weather-error');
        //Variable of settings menu
        let popup = document.querySelector('.popup');
        let userName = document.querySelector('.user-name');
        let placeOfUser = document.querySelector('.place-of-weather');
        let settingWeather = document.querySelector('.setting-weather');
        let settingLanguage = document.querySelector('.language');
        let titleLangArr = document.querySelectorAll('.language-title');
        let checkboxesArr = document.querySelectorAll('.check');
        let settingBGImage = document.querySelector('.title-setting');
        let titleHide = document.querySelector('.title-choose-hide');
        let labelSwitcherArr = document.querySelectorAll('.label-switcher');
        let switcherArr = document.querySelectorAll('.switcher');
        let btnSettingsApp = document.querySelector('.settings-app');
        let btnSettingsClose = document.querySelector('.close-popup');
        let imgSourceSet = document.querySelectorAll('.storage');
        let sliderSetting = document.querySelector('.slider-setting');
        let inputTags = document.createElement('input');
        inputTags.className = 'tags';
        inputTags.type = 'text';
        //Variables of player
        let player = document.querySelector('.player');
        let playList = document.querySelector('.play-list');
        let range = document.querySelector('.play-range');
        let volume = document.querySelector('.sound-volume');
        //===================================================================>
        let timeIsChange = new CustomEvent('changetime');
        //Other functions
        function getWeatherGeolocation(lang) {
            return new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition((position) => {
                    coordinates.setCoords(position.coords.latitude, position.coords.longitude);
                    resolve(position);
                }, (err) => {
                    reject(err);
                }, { enableHighAccuracy: true })
            }).then(r => {
                let url = `https://api.openweathermap.org/data/2.5/weather?lat=${r.coords.latitude}&lon=${r.coords.longitude}&exclude=current&appid=1b4d2db9104890bb7966cf30eb259dae&units=metric&lang=${lang}`;
                return fetch(url, {
                    method: 'GET',
                    mode: "cors"
                })
            }).then(response => {
                return response.json();
            }).then(weather => {
                city.value = weather.name;
                settings.setSetting('weatherInit', 'initialized');
                settings.setSetting('location', weather.name);
                weatherIcon.classList.add(`owf-${weather.weather[0].id}`);
                temperature.textContent = weather.main.temp + ' ºC';
                description.textContent = weather.weather[0].description;
                wind.textContent = `Wind speed: ${weather.wind.speed} m/s`;
                humidity.textContent = `Humidity: ${weather.main.humidity} %`;
            }).catch(err => {
                weatherErr.textContent = err.message;
                city.value = 'Enter your location';
            })
        }

        function setWeather(name, lang) {
            let langParam = lang;
            if (lang === 'be') {
                langParam = 'ru';
            }
            let set = new Promise((resolve) => {
                fetch(`https://api.openweathermap.org/data/2.5/weather?q=${name}&exclude=current&appid=1b4d2db9104890bb7966cf30eb259dae&units=metric&lang=${langParam}`)
                    .then(response => {
                        return response.json();
                    }).then(r => {
                        resolve(r);
                    })
            }).then(weather => {
                city.value = weather.name;
                settings.setSetting('location', weather.name);
                settings.setSetting('weatherInit', 'initialized');
                weatherIcon.classList.add(`owf-${weather.weather[0].id}`);
                temperature.textContent = weather.main.temp + ' ºC';
                description.textContent = weather.weather[0].description;
                wind.textContent = `Wind speed: ${weather.wind.speed} m/s`;
                humidity.textContent = `Humidity: ${weather.main.humidity} %`;
            })
        }

        function setPageParam(value, lang) {
            if (value === '') {
                value = translator.getValue(lang, 'labelOfNameEnter');
            } else {
                if (value !== translator.getValue(lang, 'labelOfNameEnter')) {
                    settings.setSetting('name', value);
                    let url = getBGUrl(date.getTimeOfday());
                    settings.setSetting('bgimage', url);
                    body.style.backgroundImage = url;
                }
            }
        }

        function setupPopUp(lang) {
            userName.value = settings.getSetting('name');
            placeOfUser.value = settings.getSetting('location');
            let stringsReference = translator.getValue(lang, 'setMenu');
            settingWeather.textContent = stringsReference.weather;
            settingLanguage.textContent = stringsReference.language;
            stringsReference.languageArr.forEach((string, index) => {
                titleLangArr[index].textContent = `${string}`;
            });
            checkboxesArr.forEach(e => {
                if (e.value === lang) {
                    e.checked = true;
                } else {
                    e.checked = false;
                }
            })
            settingBGImage.textContent = stringsReference.imgCollection;
            imgSourceSet.forEach(e => {
                if (e.value == settings.getSetting('imageSource')) {
                    e.checked = true;
                } else {
                    e.checked = false;
                }
            })
            if (settings.getSetting('imageSource') === '0') {
                if (document.querySelector('.tags')) {
                    document.getElementsByClassName('tags')[0].remove();
                }
            } else {
                if (!document.querySelector('.tags')) {
                    sliderSetting.append(inputTags);
                    if (settings.getSetting('imgTags')) {
                        inputTags.value = settings.getSetting('imgTags');
                    } else {
                        inputTags.value = translator.getValue(lang, 'tag');
                    }

                }
            }
            titleHide.textContent = stringsReference.hide;
            switcherArr.forEach(e => {
                if (settings.getSetting(e.value)) {
                    e.checked = false;
                } else {
                    e.checked = true;
                }
            })
            stringsReference.hideArr.forEach((string, index) => {
                labelSwitcherArr[index].textContent = `${string}`;
            })
            btnSettingsClose.textContent = stringsReference.close;
            if (document.querySelector('.tag')) {
                if (settings.getSetting('imgTags')) {
                    document.querySelector('.tag').value = settings.getSetting('imgTags');
                } else {
                    document.querySelector('.tag').value = translator.getValue(lang, 'tag');
                }
            }
        }

        function setupPage() {
            if (!settings.getSetting('player')) {
                player.className = 'non-visible';
            }
            if (!settings.getSetting('weather')) {
                weather.className = 'non-visible';
            }
            if (!settings.getSetting('clock')) {
                time.className = 'non-visible';
            }
            if (!settings.getSetting('date')) {
                todayDate.className = 'non-visible';
            }
            if (!settings.getSetting('greeting')) {
                greetingContainer.className = 'non-visible';
            }
            if (!settings.getSetting('quote')) {
                quoteBtn.className = 'non-visible';
                quote.className = 'non-visible';
                author.className = 'non-visible';
            }
        }

        //Player
        // trackPlay: '',
        // songsTimer: '',
        // volume: ''
        let interval = null; // control of scroll track;
        let trackCount = null;

        function positionTrack(audio) {
            return setInterval(() => {
                range.value = audio.currentTime;
            }, 100);
        }

        function setPlayItem(playItemArr) {
            playItemArr.forEach((e, i, arr) => {
                if (i === trackCount) {
                    arr[i].className = 'play-item playing';
                } else {
                    arr[i].className = 'play-item';
                }
            })
        }

        function playerCreate() {
            let list = translator.getPlayList();
            list.forEach(e => {
                let titleItem = document.createElement('li');
                titleItem.classList = 'play-item';
                titleItem.textContent = e.title;
                playList.appendChild(titleItem);
            });
            let playItemArr = document.querySelectorAll('.play-item');
            range.value = settings.getSetting('songsTimer');
            volume.value = settings.getSetting('volume');
            let audio = new Audio();
            trackCount = settings.getSetting('trackPlay');
            setPlayItem(playItemArr);
            audio.src = list[trackCount].path;
            audio.currentTime = settings.getSetting('songsTimer');
            audio.autoplay = false;
            audio.volume = volume.value / 100;
            player.addEventListener('click', (e) => {
                e.stopImmediatePropagation();
                switch (e.target.className) {
                    case 'play player-icon':
                        if (audio.paused) {
                            audio.play().catch(e => {
                                log(e)
                            });
                            range.max = audio.duration;
                            interval = positionTrack(audio);
                        } else {
                            audio.pause();
                            settings.setSetting('songsTimer', audio.currentTime);
                            clearInterval(interval);
                        }
                        break;
                    case 'play-prev player-icon':
                        audio.pause();
                        clearInterval(interval);
                        if (trackCount === 0) {
                            trackCount = 3;
                        } else {
                            trackCount--;
                        }
                        audio.src = list[trackCount].path;
                        setPlayItem(playItemArr);
                        settings.setSetting('trackPlay', trackCount);
                        new Promise(resolve => {
                            resolve(audio.play())
                        }).then(r => {
                            range.max = audio.duration;
                            interval = positionTrack(audio);
                        });
                        break;
                    case 'play-next player-icon':
                        audio.pause();
                        clearInterval(interval);
                        if (trackCount === 3) {
                            trackCount = 0
                        } else {
                            trackCount++;
                        }
                        audio.src = list[trackCount].path;
                        setPlayItem(playItemArr);
                        settings.setSetting('trackPlay', trackCount);
                        new Promise(resolve => {
                            resolve(audio.play())
                        }).then(r => {
                            range.max = audio.duration;
                            interval = positionTrack(audio);
                        });
                        break;
                    case 'sound-mute player-icon on':
                        e.target.className = 'sound-mute player-icon off';
                        settings.setSetting('volume', (audio.volume * 100));
                        audio.volume = 0;
                        volume.value = 0;
                        break;
                    case 'sound-mute player-icon off':
                        e.target.className = 'sound-mute player-icon on';
                        volume.value = settings.getSetting(('volume'));
                        audio.volume = volume.value / 100;
                        break;
                    case 'play-item':
                        playItemArr.forEach((elem, i, arr) => {
                            if (e.target.textContent === elem.textContent) {
                                arr[i].className = 'play-item playing';
                            } else {
                                arr[i].className = 'play-item';
                            }
                        })
                        audio.pause();
                        clearInterval(interval);
                        for (let i = 0; i < list.length; i++) {
                            if (e.target.textContent === list[i].title) {
                                audio.load();
                                audio.src = list[i].path;
                                settings.setSetting('trackPlay', i);
                                new Promise(resolve => {
                                    resolve(audio.play())
                                }).then(r => {
                                    range.max = audio.duration;
                                    interval = positionTrack(audio);
                                });
                                break;
                            }
                        }
                        break;
                }
            })
            audio.onended = () => {
                clearInterval(interval);
                if (trackCount >= 3) {
                    audio.src = list[0].path;
                    trackCount = 0;
                } else {
                    trackCount++;
                    audio.src = list[trackCount].path;
                }
                setPlayItem(playItemArr);
                settings.setSetting('trackPlay', trackCount);
                new Promise(resolve => {
                    resolve(audio.play())
                }).then(r => {
                    range.max = audio.duration;
                    interval = positionTrack(audio);
                });
            }
            range.addEventListener('input', () => {
                settings.setSetting('songsTimer', range.value);
                audio.currentTime = range.value;
            })
            volume.addEventListener('input', () => {
                settings.setSetting('volume', volume.value);
                audio.volume = volume.value / 100;
            })
        }

        

        function getBGUnsplash() {
            let url = 'https://api.unsplash.com/photos/random?client_id=e-ikdj_pn59_CvTI4gvPv7K4hzvsQY-fpWZiDhDsJ90&orientation=landscape';
            if (settings.getSetting('imgTags')) {
                url = url + `&query=${settings.getSetting('imgTags')}`
            }
            fetch(url).then(r => {
                return r.json();
            }).then(data => {
                settings.setSetting('bgimage', data.urls.regular);
                setBgImage(data.urls.regular, body);
            })
        }
        function getBGFlikr(){
            //&tags=nature
            //https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=084b2251b471c9c3b47a582a40abe69d&extras=url_l&format=json&nojsoncallback=1
            let url = 'https://www.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=084b2251b471c9c3b47a582a40abe69d&extras=url_l&format=json&nojsoncallback=1';
            if (settings.getSetting('imgTags')) {
                url = url + `&tags=${settings.getSetting('imgTags')}`
            }
            fetch(url).then(r => {
                return r.json();
            }).then(data => {
                    data.photos.photo.forEach(e=>{
                        if(e.url_l){
                            flikrGallery.push(e.url_l);
                        }                    
                    })              
            })
        }
        playerCreate();
        getBGFlikr();
        //Realization of settings
        btnSettingsApp.addEventListener('click', () => {
            setupPopUp(lang);
            popup.className = 'popup';
            popup.addEventListener('click', (e) => {
                e.stopImmediatePropagation();
                switch (e.target.className) {
                    case 'popup':
                        popup.className = 'popup hidden';
                        break;
                    case 'close-popup':
                        popup.className = 'popup hidden';
                        break;
                    case 'user-name':
                        userName.addEventListener('blur', () => {
                            settings.setSetting('name', userName.value);
                            name.value = userName.value;
                            userName.removeEventListener('blur', () => {
                            });
                        })
                        break;
                    case 'place-of-weather':
                        placeOfUser.addEventListener('blur', () => {
                            setWeather(placeOfUser.value, lang);
                            placeOfUser.removeEventListener('blur', () => {
                            });
                        })
                        break;
                    case 'check':
                        if (e.target.checked) {
                            checkboxesArr.forEach(elem => {
                                if (elem.value !== e.target.value) {
                                    elem.checked = false;
                                }
                            })
                        } else {
                            e.target.checked = true;
                        }
                        settings.setSetting('lang', e.target.value);
                        lang = e.target.value;
                        // location.reload();
                        setWeather(settings.getSetting('location'), lang);
                        greeting.textContent = translator.getValue(lang, 'timeOfDay')[date.getTimeOfday()];
                        let dateToday = date.getToday();
                        month = translator.getValue(lang, 'month');
                        week = translator.getValue(lang, 'weekday');
                        todayDate.textContent = week[dateToday.day] + ', ' + month[dateToday.month] + ' ' + dateToday.number;
                        getQ(lang);
                        if (document.querySelector('.tags')) {
                            if (settings.getSetting('imgTags') === null) {
                                document.querySelector('.tags').value = translator.getValue(lang, 'tag');
                            } else {
                                document.querySelector('.tags').value = settings.getSetting('imgTags');
                            }
                        }
                        let menuRef = translator.getValue(lang, 'setMenu');
                        settingWeather.textContent = menuRef.weather;
                        settingLanguage.textContent = menuRef.language;
                        titleLangArr.forEach((e, i) => {
                            e.textContent = menuRef.languageArr[i];
                        })
                        settingBGImage.textContent = menuRef.imgCollection;
                        titleHide.textContent = menuRef.imgCollection;
                        labelSwitcherArr.forEach((e, i) => {
                            e.textContent = menuRef.hideArr[i];
                        })
                        btnSettingsClose.textContent = menuRef.close;
                        break;
                    case 'switcher':
                        log(e.target.checked);
                        switch (e.target.value) {
                            case 'player':
                                if (e.target.checked) {
                                    player.className = 'non-visible';
                                    settings.setSetting('player', false);
                                } else {
                                    player.className = 'player';
                                    settings.setSetting('player', true);
                                }
                                break;
                            case 'weather':
                                if (e.target.checked) {
                                    weather.className = 'non-visible';
                                    settings.setSetting('weather', false);
                                } else {
                                    weather.className = 'weather';
                                    settings.setSetting('weather', true);
                                }
                                break;
                            case 'clock':
                                if (e.target.checked) {
                                    time.className = 'non-visible';
                                    settings.setSetting('clock', false);
                                } else {
                                    time.className = 'time';
                                    settings.setSetting('clock', true);
                                }
                                break;
                            case 'date':
                                if (e.target.checked) {
                                    todayDate.className = 'non-visible';
                                    settings.setSetting('date', false);
                                } else {
                                    todayDate.className = 'date';
                                    settings.setSetting('date', true);
                                }
                                break;
                            case 'greeting':
                                if (e.target.checked) {
                                    greetingContainer.className = 'non-visible';
                                    settings.setSetting('greeting', false);
                                } else {
                                    greetingContainer.className = 'greeting-container';
                                    settings.setSetting('greeting', true);
                                }
                                break;
                            case 'quote':
                                if (e.target.checked) {
                                    quoteBtn.className = 'non-visible';
                                    quote.className = 'non-visible';
                                    author.className = 'non-visible';
                                    settings.setSetting('quote', false);
                                } else {
                                    quoteBtn.className = 'change-quote';
                                    quote.className = 'quote';
                                    author.className = 'author';
                                    settings.setSetting('quote', true);
                                }
                                break;
                        }

                        break;
                    case 'storage':
                        imgSourceSet.forEach(elem => {
                            if (e.target.value !== elem.value) {
                                elem.checked = false;
                            } else {
                                elem.checked = true;
                            }
                        })
                        settings.setSetting('imageSource', e.target.value);
                        imgsourse = Number(e.target.value);
                        
                        if (e.target.value === '0') {
                            if (document.querySelector('.tags')) {
                                inputTags.removeEventListener('blur', () => { });
                                document.getElementsByClassName('tags')[0].remove();
                            }
                        } else {
                            if (!document.querySelector('.tags')) {
                                sliderSetting.append(inputTags);
                                if (settings.getSetting('imgTags') !== null) {
                                    inputTags.value = settings.getSetting('imgTags');
                                } else {
                                    inputTags.value = translator.getValue(lang, 'tag');
                                }
                                inputTags.addEventListener('blur', (e) => {                                    
                                    if (inputTags.value === '') {
                                        settings.setSetting('imgTags', null);
                                        inputTags.value = translator.getValue(lang, 'tag');
                                    } else {
                                        log('w')
                                        settings.setSetting('imgTags', inputTags.value);
                                    }
                                    log('dispatch');
                                    if(imgsourse === 1){
                                        getBGFlikr();
                                    }
                                    if(imgsourse === 2){
                                        getBGUnsplash();
                                    }
                                    body.dispatchEvent(timeIsChange);
                                    
                                })
                            }
                        }
                        body.dispatchEvent(timeIsChange);
                        break;
                }
            })
        })

        window.addEventListener('load', () => {

            body.style.background = "url(" + settings.getSetting('bgimage') + ")";
            setupPage();

            let timeControl = date.getTime().hours;

            setInterval(() => {
                let timeData = date.getTime();
                if (timeControl !== timeData.hours) {
                    timeControl = timeData.hours;
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
                setPageParam(name.value, lang);
            })
            //Body change img depend on time
            body.addEventListener('changetime', () => {
                switch (imgsourse) {
                    case 0:
                    log('git')
                        let dayTime = date.getTimeOfday();
                        let src = getBGUrl(dayTime);
                        setBgImage(src, body);
                        settings.setSetting('bgimage', src);
                        break;
                    case 1:
                        if(flikrGallery.length === 0){
                            new Promise((resolve, reject)=>{
                                resolve(getBGFlikr());
                            }).then(r=>{
                                setBgImage(flikrGallery[indexImgNow + 1], body);
                            })
                        }
                        setBgImage(flikrGallery[indexImgNow + 1], body);
                        settings.setSetting('bgimage', flikrGallery[0]);
                        break;
                    case 2:
                        getBGUnsplash();
                        break;
                }
            }, true);

            //Slider
            //prev <------
            prev.addEventListener('click', () => {
                switch (imgsourse) {
                    case 0:
                        let url = settings.getSetting('bgimage');
                        if (url === '../assets/img/bg.jpg') {
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
                        url = url + fileName + '.jpg';
                        settings.setSetting('bgimage', url);
                        setBgImage(url, body);
                        break;
                    case 1:  
                    let u;                      
                        if(indexImgNow ===0){
                            indexImgNow = flikrGallery.length - 1
                            u = flikrGallery[indexImgNow];
                        }
                        else{
                            indexImgNow--;
                            u = flikrGallery[indexImgNow];
                        }
                        setBgImage(u, body); 
                        settings.setSetting('bgimage', u);                                           
                        break;
                    case 2:
                        getBGUnsplash();
                        break;
                }
            })
            //next----->
            next.addEventListener('click', () => {
                switch (imgsourse) {
                    case 0:
                        let url = settings.getSetting('bgimage');
                        if (url === '../assets/img/bg.jpg') {
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
                        url = url + fileName + '.jpg';
                        settings.setSetting('bgimage', url);
                        setBgImage(url, body);
                        break;
                    case 1:
                    let u;
                    if(indexImgNow === flikrGallery.length - 1){
                        indexImgNow = 0
                        u = flikrGallery[indexImgNow];
                    }
                    else{
                        indexImgNow++;
                        u = flikrGallery[indexImgNow];
                    }
                    setBgImage(u, body);
                    settings.setSetting('bgimage', u);  
                        break;
                    case 2:
                        getBGUnsplash();
                        break;
                }
            })

            //Quotes
            // quoteBtn - button for update quote
            // quote - quoteText
            // author - quoteAuthor

            let quoteSetUp = getQ();
            quoteSetUp.then(r => {
                quote.textContent = `${r[0].quote}`;
                author.textContent = `${r[0].author}`;
            });

            //Update quote

            quoteBtn.addEventListener('click', () => {
                let animateClick = animateBtnQuote(quoteBtn);
                animateClick.play();
                let updateQuote = getQ();
                updateQuote.then(r => {
                    quote.textContent = `${r[0].quote}`;
                    author.textContent = `${r[0].author}`;
                })
            })

            //Weather widget

            if (settings.getSetting('weatherInit') === null) {
                getWeatherGeolocation(lang);
            } else {
                setWeather(settings.getSetting('location'), lang);
            }
            //input place for weather;
            city.addEventListener('blur', () => {
                setWeather(city.value);
            });
        });
    })
}

start();