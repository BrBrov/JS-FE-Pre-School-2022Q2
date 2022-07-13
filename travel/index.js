let {log} = console;

// let requirements = [
//     'Слайдер изображений в секции destinations +50',
//     'на десктоп варианте при клике на урезанную картинку слева или справа изображение меняется по принципу карусели(например если нажать правую картинку та что была в центре на уезжает налево, а та что была видна наполовину оказывается справа) + 20',
//     'Три точки внизу отображают "/номер слайда"/, то есть каждому слайду соответствует свой кружочек, который становится активным при нахождении соответствующего ему слайда в центре. На мобильном варианте картинка одна, но поверх нее появляются стрелочки навигации (можно сделать как карусель или же затемнять кнопку если слайдер достиг края) +20',
//     'Анимации плавного перемещения для слайдера +10',
//     'Нажатие на кнопку Login (кнопка Account в мобильной версии) показывает сверстанный логин попап + 50',
//     'логин попап соответствует верстке его закрытие происходит при клике вне попапа +25',
//     'логин попап имеет 2 инпута (логин и пароль) при нажатии на кнопку Sign In показывается браузерный алерт с введенными данными (для реализации можно использовать тег ) +25',
//     'Нажатие на кнопку Register на Login попапе меняет разметку попапа на разметку Sign Up попапа согласно макету (То есть нажатие не закрывает модал а просто меняет его наполнение). +25',
//     'Total score 85\nScore 75'
// ];
//
// requirements.forEach((value) => {
//     log(value);
// })

addEventListener('resize', adaptive);

function adaptive() {
    const path = './assets/jpg/';
    const blockMarksOfDots = {
        active: 'dot active-dot',
        inactive: 'dot inactive-dot'
    };
    const pathStory = {
        cave: ['cave-big.jpg', 'cave.jpg'],
        road: ['road-big.jpg', 'road.jpg'],
        winter: ['winter-big.jpg', 'winter.jpg'],
        car: ['car-big.jpg', 'car.jpg']
    };
    const textStory = {
        desktop: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
        mobile: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla.Lorem ipsum dolor sit a...'
    }
    let carouselItemsImg = document.getElementsByClassName('img-item');
    let dots = document.getElementsByClassName('dot');
    let imgStory = document.getElementsByClassName('img-story');
    let textStoryDivision = document.getElementsByClassName('text-story');


    let width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

    if (width <= 390) {
        carouselItemsImg[0].attributes[1].nodeValue = path + "ocean.jpg";
        dots[1].className = blockMarksOfDots.inactive;
        dots[0].className = blockMarksOfDots.active;
        imgStory[0].attributes[1].nodeValue = path + pathStory.cave[1];
        imgStory[1].attributes[1].nodeValue = path + pathStory.road[1];
        imgStory[2].attributes[1].nodeValue = path + pathStory.winter[1];
        imgStory[3].attributes[1].nodeValue = path + pathStory.car[1];
        for (let i = 0; i < 4; i++) {
            textStoryDivision[i].textContent = textStory.mobile;
        }
        let menuButton = document.querySelector('.btn-login');

        menuButton.addEventListener('click', () => {

            if (!document.querySelector('.burger-menu')) {

                if (Math.max(document.documentElement.clientWidth, window.innerWidth || 0) <= 390) {


                    let webPageElem = document.querySelector('.container');
                    const links = ['How It Works', 'Destinations', 'Plan Your Trip', 'Travel Stories', 'Account', 'Social Media'];
                    let divElem = document.createElement('div');
                    divElem.className = 'burger-menu';
                    divElem.style.animation = 'menu 1.4s alternate forwards';
                    let closeElem = document.createElement('div');
                    closeElem.className = 'x-close';
                    let navElem = document.createElement('div');
                    navElem.className = 'burger-menu-block';

                    for (let c in links) {
                        let linkElem = document.createElement('div');
                        linkElem.className = 'burger-link';
                        linkElem.textContent = links[c];
                        navElem.appendChild(linkElem);
                    }
                    divElem.appendChild(closeElem);
                    divElem.appendChild(navElem);
                    webPageElem.append(divElem);

                    let burgerButton = document.getElementsByClassName('burger-menu')[0];

                    document.body.addEventListener('touchstart', () => {

                        if (document.getElementsByClassName('burger-menu')[0]) {
                            burgerButton.style.animation = 'menuClose 1.4s alternate forwards';
                            setTimeout(() => {
                                burgerButton.remove()
                            }, 1450);
                        }
                    }, {capture: true})

                    burgerButton.addEventListener('touchstart', (eventData) => {

                        if (eventData.target.className === 'x-close') {
                            document.getElementsByClassName('x-close')[0].style.transition = 'all 1s ease-in-out';
                            document.getElementsByClassName('x-close')[0].style.transform = 'rotate(720deg)';
                            burgerButton.style.animation = 'menuClose 1.4s alternate forwards';
                            setTimeout(() => {
                                burgerButton.remove()
                            }, 1450);
                        } else {
                            switch (eventData.target.outerText) {
                                case links[0]:
                                    document.getElementsByClassName('burger-link')[0].style.color = 'grey';
                                    document.getElementById('preview').scrollIntoView(false);
                                    break;
                                case links[1]:
                                    document.getElementsByClassName('burger-link')[1].style.color = 'grey';
                                    window.scrollTo(0, document.getElementById('steps').offsetTop);
                                    break;
                                case links[2]:
                                    document.getElementsByClassName('burger-link')[2].style.color = 'grey';
                                    window.scrollTo(0, document.getElementById('destinations').offsetTop);
                                    break;
                                case links[3]:
                                    document.getElementsByClassName('burger-link')[3].style.color = 'grey';
                                    window.scrollTo(0, document.getElementById('stories').offsetTop);
                                    break;
                                case links[4]:
                                    document.getElementsByClassName('burger-link')[4].style.color = 'grey';
                                    break;
                                case links[5]:
                                    document.getElementsByClassName('burger-link')[5].style.color = 'grey';
                                    document.getElementsByClassName('social-list')[0].scrollIntoView();
                                    break;
                            }
                        }
                    })
                }
            }
        });
    } else {
        carouselItemsImg[0].attributes[1].nodeValue = "./assets/jpg/ocean-big.jpg";
        dots[1].className = blockMarksOfDots.active;
        dots[0].className = blockMarksOfDots.inactive;
        imgStory[0].attributes[1].nodeValue = path + pathStory.cave[0];
        imgStory[1].attributes[1].nodeValue = path + pathStory.road[0];
        imgStory[2].attributes[1].nodeValue = path + pathStory.winter[0];
        imgStory[3].attributes[1].nodeValue = path + pathStory.car[0];
        for (let i = 0; i < 4; i++) {
            textStoryDivision[i].textContent = textStory.desktop;
        }
    }
}


adaptive();



