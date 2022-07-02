let {log} = console;

let requirements = [
    'Вёрстка соответствует макету. Ширина экрана 390px +48',
    'блок <header> +6',
    'секция preview +9',
    'секция steps +9',
    'секция destinations +9',
    'секция stories +9',
    'блок <footer> +6',
    'Ни на одном из разрешений до 320px включительно не появляется горизонтальная полоса прокрутки. Весь контент страницы при этом сохраняется: не обрезается и не удаляется +15',
    'нет полосы прокрутки при ширине страницы от 1440рх до 390px +7',
    'нет полосы прокрутки при ширине страницы от 390px до 320рх +8',
    'На ширине экрана 390рх и меньше реализовано адаптивное меню +22',
    'при ширине страницы 390рх панель навигации скрывается, появляется бургер-иконка +2',
    'при нажатии на бургер-иконку плавно появляется адаптивное меню +4',
    'адаптивное меню соответствует макету +4',
    'при нажатии на крестик адаптивное меню плавно скрывается уезжая за экран +4',
    'ссылки в адаптивном меню работают, обеспечивая плавную прокрутку по якорям +4 (все кроме Account, она пока что просто закрывает меню)',
    'при клике по ссылке в адаптивном меню адаптивное меню плавно скрывается, также скрытие меню происходит если сделать клик вне данного окна +4',
    'Total score 105\nScore 100'
];

requirements.forEach((value) => {
    log(value);
})


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
        log('page was resized - Adaptive!')
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
        log('no adaptive!');
    }
}

let menuButton = document.querySelector('.btn-login');

menuButton.addEventListener('click', () => {

    if (!document.querySelector('.burger-menu')) {

        if (Math.max(document.documentElement.clientWidth, window.innerWidth || 0) <= 390) {


            let webPageElem = document.querySelector('.container');
            const links = ['How It Works', 'Destinations', 'Plan Your Trip', 'Travel Stories', 'Account', 'Social Media'];
            let divElem = document.createElement('div');
            divElem.className = 'burger-menu';
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
            webPageElem.append(divElem)
            log('Elem created');
        }
    }
});


adaptive();



