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
const path = './assets/jpg/';
const blockMarksOfDots = {
    active: 'dot active-dot',
    inactive: 'dot inactive-dot'
}
let carouselItemsImg = document.getElementsByClassName('img-item');
let dots = document.getElementsByClassName('dot');

addEventListener('resize', adaptive);

function adaptive(){
    let width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
    if(width<=390){
        carouselItemsImg[0].attributes[1].nodeValue = path + "ocean.jpg";
        log(carouselItemsImg[0].attributes['src']);
        dots[1].className = blockMarksOfDots.inactive;
        dots[0].className = blockMarksOfDots.active;
        log(dots[0].className);
        log('page was resized - Adaptive!')
    }else{
        carouselItemsImg[0].attributes[1].nodeValue = "./assets/jpg/ocean-big.jpg";
        dots[1].className = blockMarksOfDots.active;
        dots[0].className = blockMarksOfDots.inactive;
        log('no adaptive!');
    }
}
adaptive();