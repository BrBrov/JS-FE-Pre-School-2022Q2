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
    let slidesArray = document.getElementsByClassName('carousel-item');
    let backUpSlidesArray = [];
    for (let slides of slidesArray) {
        backUpSlidesArray.push(slides.cloneNode(true));
    }
    let carousel = document.querySelector('.carousel');
    let timerInterval = -1;
    if(timerInterval !== -1){
        clearInterval(timerInterval);
    }

    // Carousel code for desktop

    function carouselWorker() {

        if(slidesArray.length !== 6){
            let backUp = carousel.cloneNode(false);
            carousel.remove();
            backUpSlidesArray.forEach((elem)=>{
                backUp.appendChild(elem);
            });
            document.getElementsByClassName('title-destination')[0].after(backUp);
            let firstElem = slidesArray[0].cloneNode(true);
            slidesArray[2].after(firstElem);
            firstElem = slidesArray[1].cloneNode(true);
            slidesArray[3].after(firstElem);
            let lastElem = slidesArray[2].cloneNode(true);
            slidesArray[0].before(lastElem);
        }

        function rotate() {
            slidesArray = document.getElementsByClassName('carousel-item');
            let elem = slidesArray[0].cloneNode(true);
            slidesArray[5].after(elem);
            let text = slidesArray[3].children[1].textContent;
            for (let dot of dots) {
                dot.className = blockMarksOfDots.inactive;
            }
            switch (text) {
                case 'SPAIN':
                    dots[0].className = blockMarksOfDots.active;
                    break;
                case 'JAPAN':
                    dots[1].className = blockMarksOfDots.active;
                    break;
                case 'USA':
                    dots[2].className = blockMarksOfDots.active;
                    break;
            }
            slidesArray[0].remove();
        }

        function rotateLeft() {
            let backUpElem = slidesArray[5].cloneNode(true);
            slidesArray[0].before(backUpElem);
            slidesArray[6].remove();
        }

        function rotateRight() {
            let backUpElem = slidesArray[0].cloneNode(true);
            slidesArray[5].after(backUpElem);
            slidesArray[0].remove();
        }

        timerInterval = setInterval(rotate, 3000);

        window.addEventListener('resize', (e)=>{

            let width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
            if(width < 391){
                clearInterval(timerInterval);
            }
            location.reload();
            e.stopImmediatePropagation();
            window.removeEventListener('resize',()=>{});
        })

        carousel.addEventListener('mouseover', function mouseOn() {
            clearTimeout(timerInterval);
            carousel.addEventListener('mouseout', function mouseOut() {
                timerInterval = setInterval(rotate, 3000);
                carousel.removeEventListener('mouseout', mouseOut);
            });
            carousel.addEventListener('click', function (data) {
                function setDots(data) {
                    for (let dot of dots) {
                        dot.className = blockMarksOfDots.inactive
                    }
                    switch (data) {
                        case 'SPAIN':
                            dots[0].className = blockMarksOfDots.active;
                            break;
                        case 'JAPAN':
                            dots[1].className = blockMarksOfDots.active;
                            break;
                        case 'USA':
                            dots[2].className = blockMarksOfDots.active;
                            break;
                    }
                }

                switch (data.target.className) {
                    case 'img-item':
                        let img = document.querySelectorAll('.img-item');
                        if (data.target.alt === img[3].alt && data.target.alt === img[0].alt) {
                            rotateRight();
                            setDots(data.target.alt);
                            break;
                        }
                        if (data.target.alt === img[1].alt && data.target.alt === img[4].alt) {
                            rotateLeft();
                            setDots(data.target.alt);
                            break;
                        }
                        break;
                    case 'title-item':
                        let title = document.querySelectorAll('.title-item');
                        if (data.target.innerText === title[3].innerText && data.target.innerText === title[0].innerText) {
                            rotateRight();
                            setDots(data.target.innerText);
                            break;
                        }
                        if (data.target.innerText === title[3].innerText && data.target.innerText === title[3].innerText) {
                            rotateLeft();
                            setDots(data.target.innerText);
                            break;
                        }
                        break;
                }

            })

        })

        let dotsNavBar = document.getElementsByClassName('dots-nav')[0];
        dotsNavBar.addEventListener('mouseover', function mouseOn() {
            clearTimeout(timerInterval);
            dotsNavBar.addEventListener('click', function ev(data) {
                log(data.target.className);
                let position = 0;
                let node = data.target;
                let activeDotPosition = 0;
                while (node.previousElementSibling) {
                    position++;
                    node = node.previousElementSibling;
                }
                for (let dot of dots) {
                    dot.className = blockMarksOfDots.inactive;
                }
                dots[position].className = blockMarksOfDots.active;
                let elemsDisplay = slidesArray[2].innerText;

                switch (elemsDisplay) {
                    case 'SPAIN':
                        activeDotPosition = 0;
                        break;
                    case 'JAPAN':
                        activeDotPosition = 1;
                        break;
                    case 'USA':
                        activeDotPosition = 2;
                        break;
                }

                let rate = 0;

                if (position > activeDotPosition) {
                    rate = position - activeDotPosition;
                    let delay = 0;
                    while (rate !== 0) {
                        rotateRight();
                        rate--;
                        delay = delay + 1200;
                    }
                } else {
                    rate = activeDotPosition - position;
                    let delay = 0
                    while (rate !== 0) {
                        setTimeout(() => {
                            rotateLeft();
                        }, delay);
                        rate--;
                        delay = delay + 1200;
                    }
                }
                log(activeDotPosition);
                data.stopImmediatePropagation();
            }, false)
            dotsNavBar.addEventListener('mouseout', function mouseOut() {
                timerInterval = setInterval(rotate, 3000);
                dotsNavBar.removeEventListener('mouseout', mouseOut);
            });
        });

    }

    function carouselWorkerForMobile(){
        let carousel = document.querySelector('.carousel');
        let itemsCarousel = document.getElementsByClassName('carousel-item');
        itemsCarousel[0].before(itemsCarousel[2].cloneNode(true));
        carousel.style.setProperty('--left-arrow', '0.5');
        let count = 0;
        let backUpArray = [];
        carousel.addEventListener('pointerdown', (data) => {
            let rectCarousel = carousel.getClientRects()[0];
            let centerCarousel = rectCarousel.width / 2;

            function dotsMark(ev) {
                if(count > 2){
                    count = 2;
                }
                if(count < 0){
                    count = 0;
                }
                for (let dot of dots) {
                    dot.className = blockMarksOfDots.inactive;
                }
                dots[count].className = blockMarksOfDots.active;
                if (count === 0) {
                    carousel.style.setProperty('--left-arrow', '0.5');
                } else if (count === 2) {
                    carousel.style.setProperty('--right-arrow', '0.5');
                } else {
                    setTimeout(() => {
                        carousel.style.setProperty('--left-arrow', '1');
                    }, 250);
                    setTimeout(() => {
                        carousel.style.setProperty('--right-arrow', '1');
                    }, 250);
                }
                if (ev === 'right') {
                    if (backUpArray.length !== 2) {
                        backUpArray.push(itemsCarousel[0].cloneNode(true));
                        itemsCarousel[0].remove();
                    }
                } else {
                    if (backUpArray.length !== 0) {
                        itemsCarousel[0].before(backUpArray.pop());
                    }
                }
                log(backUpArray);
            }

            if (data.clientX < centerCarousel) {
                log('click left');
                let e = 'left';
                carousel.style.setProperty('--left-arrow', '0.5');
                count--;
                dotsMark(e);
            } else {
                log('clock right');
                let e = 'right';
                carousel.style.setProperty('--right-arrow', '0.5');
                count++;
                dotsMark(e);
            }
            log(count);
            data.stopImmediatePropagation();

            document.addEventListener('resize',(e)=>{
                location.reload();
                e.stopImmediatePropagation();
                document.removeEventListener('resize',()=>{});
            })
        }, false);
    }

    // Pop Up Creation

    function CreatePopUp() {
        let popUpModal = document.createElement('div');
        popUpModal.className = 'pop-up';

        let popUpTitle = document.createElement('div');
        popUpTitle.className = 'pop-up-title';
        popUpTitle.textContent = 'Log in to your account';
        popUpModal.append(popUpTitle);

        let btnFaceBook = document.createElement('button');
        let imgFaceBook = document.createElement('img');
        let textFaceBook = document.createElement('span');
        imgFaceBook.className = 'facebook-img-pop-up';
        imgFaceBook.src = './assets/svg/Facebook.svg';
        imgFaceBook.alt = 'Facebook';
        textFaceBook.className = 'facebook-text-pop-up';
        textFaceBook.textContent = 'Sign In with Facebook';
        btnFaceBook.className = 'pop-up-btn-facebook';
        btnFaceBook.append(imgFaceBook);
        btnFaceBook.append(textFaceBook);
        popUpModal.append(btnFaceBook);

        let btnGoogle = document.createElement('button');
        let imgGoogle = document.createElement('img');
        let textGoogle = document.createElement('span');
        imgGoogle.className = 'google-img-pop-up';
        imgGoogle.src = "./assets/svg/Google.svg";
        imgGoogle.alt = "Google";
        textGoogle.className = 'google-text-pop-up';
        textGoogle.textContent = 'Sign In with Google';
        btnGoogle.className = 'pop-up-btn-google';
        btnGoogle.append(imgGoogle);
        btnGoogle.append(textGoogle);
        popUpModal.append(btnGoogle);

        let popUpSeparator = document.createElement('div');
        popUpSeparator.className = 'separator-pop-up';
        let separatorLeft = document.createElement('div');
        separatorLeft.className = 'line-separator';
        let separatorRight = document.createElement('div');
        separatorRight.className = 'line-separator';
        let separatorText = document.createElement('div');
        separatorText.className = 'text-separator';
        separatorText.textContent = 'or';
        popUpSeparator.appendChild(separatorLeft);
        popUpSeparator.appendChild(separatorText);
        popUpSeparator.appendChild(separatorRight);
        popUpModal.append(popUpSeparator);

        let formPopUp = document.createElement('form');
        formPopUp.className = 'register-form';
        formPopUp.action = '#';
        let labelEmail = document.createElement('label');
        labelEmail.className = 'label-email';
        labelEmail.htmlFor = 'mail';
        labelEmail.textContent = 'E-mail';
        let inputMail = document.createElement('input');
        inputMail.type = 'email';
        inputMail.id = 'mail';
        inputMail.name = 'email';
        inputMail.autofocus = true;
        let brForm = document.createElement('br');
        let labelPass = document.createElement('label');
        labelPass.className = 'label-password';
        labelPass.htmlFor = 'password';
        labelPass.textContent = 'Password';
        let inputPass = document.createElement('input');
        inputPass.id = 'password';
        inputPass.type = 'password';
        inputPass.name = 'password';
        formPopUp.append(labelEmail);
        formPopUp.append(brForm);
        formPopUp.append(labelPass);
        labelEmail.append(inputMail);
        labelPass.append(inputPass);
        popUpModal.append(formPopUp);
        let buttonSignIn = document.createElement('button');
        let textSignIn = document.createElement('span');
        buttonSignIn.className = 'btn-sign-up';
        textSignIn.className = 'label-sign-up';
        textSignIn.textContent = 'Sign In';
        buttonSignIn.append(textSignIn);
        popUpModal.append(buttonSignIn);
        popUpModal.append(document.createElement('br'));
        let forgotPass = document.createElement('a');
        forgotPass.className = 'forgot-password';
        forgotPass.href = '#';
        forgotPass.textContent = 'Forgot Your Password?';
        popUpModal.append(forgotPass);
        let separatorDown = document.createElement('div');
        separatorDown.className = 'bottom-separator';
        popUpModal.append(separatorDown);
        let noAccount = document.createElement('span');
        noAccount.className = 'dont-register';
        noAccount.textContent = 'Don’t have an account? ';
        let registerLink = document.createElement('a');
        registerLink.className = 'register';
        registerLink.href = '#';
        registerLink.textContent = 'Register';
        popUpModal.append(noAccount);
        popUpModal.append(registerLink);

        return popUpModal;
    }

    // Sign Up Creation

    function CreateSignUp() {
        let popUpModal = document.createElement('div');
        popUpModal.className = 'sign-up';
        let signTitle = document.createElement('div');
        signTitle.className = 'sign-up-title';
        signTitle.textContent = 'Create account';
        popUpModal.append(signTitle);
        let formSignIn = document.createElement('form');
        formSignIn.className = 'sign-form';
        formSignIn.action = '#';
        let labelEmail = document.createElement('label');
        let labelPass = document.createElement('label');
        let inputMail = document.createElement('input');
        let inputPass = document.createElement('input');
        labelEmail.className = 'sign-email';
        labelEmail.htmlFor = 'sign-mail';
        labelEmail.textContent = 'E-mail';
        labelPass.className = 'sign-password';
        labelPass.htmlFor = 'password';
        labelPass.textContent = 'Password';
        inputMail.type = 'email';
        inputMail.name = 'email';
        inputMail.id = 'sign-mail';
        inputMail.autofocus = true;
        inputPass.id = 'sign-password';
        inputPass.name = 'password';
        inputPass.type = 'password';
        formSignIn.append(labelEmail);
        formSignIn.append(labelPass);
        labelEmail.append(inputMail);
        labelPass.append(inputPass);
        popUpModal.append(formSignIn);
        let btnSignIn = document.createElement('button');
        btnSignIn.className = 'btn-sign-in';
        let signInText = document.createElement('span');
        signInText.className = 'label-sign-in';
        signInText.textContent = 'Sign In';
        btnSignIn.append(signInText);
        popUpModal.append(btnSignIn);
        let separator = document.createElement('div');
        separator.className = 'bottom-separator-sign';
        popUpModal.append(separator);
        let signText = document.createElement('span');
        signText.className = 'dont-sign';
        signText.textContent = 'Already have an account? ';
        let linkSign = document.createElement('a');
        linkSign.className = 'sign';
        linkSign.textContent = 'Log in';
        linkSign.href = '#';
        popUpModal.append(signText);
        popUpModal.append(linkSign);

        return popUpModal;
    }

    // Handler of adaptive

    let width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

    // Replacer links for elements of adaptive version

    if (width <= 390) {
        carouselItemsImg[0].attributes[1].nodeValue = path + "ocean.jpg";
        carouselItemsImg[1].attributes[1].nodeValue = path + "gates.jpg";
        carouselItemsImg[2].attributes[1].nodeValue = path + "bridge.jpg";
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

        //Adaptive slider;

        carouselWorkerForMobile();

        //Burger menu algorithm

        menuButton.addEventListener('touchstart', () => {

            if (!document.querySelector('.burger-menu')) {

                if (Math.max(document.documentElement.clientWidth, window.innerWidth || 0) <= 390) {

                    // Burger menu creation

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

                    // Event listener for body for closing burger menu

                    document.body.addEventListener('touchstart', () => {

                        if (document.getElementsByClassName('burger-menu')[0]) {
                            burgerButton.style.animation = 'menuClose 1.4s alternate forwards';
                            setTimeout(() => {
                                burgerButton.remove()
                            }, 1450);
                        }
                    }, {capture: true})

                    // Handler of burger menu

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
                                    // Listener for pop up and sign up menu for adaptive version
                                    let listener = (eventData) => {
                                        switch (eventData.target.className) {
                                            case 'pop-up-btn-facebook':
                                            case 'facebook-img-pop-up':
                                            case 'facebook-text-pop-up':
                                                alert('Entrances with Facebook!');
                                                break;
                                            case 'pop-up-btn-google':
                                            case 'google-img-pop-up':
                                            case 'google-text-pop-up':
                                                alert('Entrances with Google');
                                                break;
                                            case 'btn-sign-up':
                                            case 'label-sign-up':
                                                let mail = document.getElementById('mail');
                                                if (mail.checkValidity()) {
                                                    mail = mail.value;
                                                } else {
                                                    mail = 'Email isn\'t valid!';
                                                }
                                                if (mail.length === 0) {
                                                    mail = 'Email wasn\'t entered';
                                                }
                                                let password = document.getElementById('password').value;
                                                if (password.length === 0) {
                                                    password = 'Password was\'t entered';
                                                }
                                                alert(mail + '\n' + password);
                                                break;
                                            case 'forgot-password':
                                                alert('...page for recovery access account');
                                                break;
                                            case 'pop-up-bg':
                                                let bgPopUp = document.querySelector('.pop-up-bg');
                                                if (document.querySelector('.pop-up')) {
                                                    document.querySelector('.pop-up').style.animation = 'popupClose 1.5s alternate forwards';
                                                    setTimeout(() => {
                                                        bgPopUp.remove();
                                                    }, 1500);
                                                } else {
                                                    document.querySelector('.sign-up').style.animation = 'popupClose 1.5s alternate forwards';
                                                    setTimeout(() => {
                                                        bgPopUp.remove();
                                                    }, 1500);
                                                }
                                                break;
                                            case 'register':

                                                // Change sign up from pop up

                                                popUpModal.style.animation = 'popupClose 0.75s alternate forwards';
                                                setTimeout(() => {
                                                    popUpModal.remove()
                                                }, 750);
                                                let signUp = CreateSignUp();
                                                setTimeout(() => {
                                                    popUpContainer.append(signUp);
                                                }, 750);

                                                // Sign up event listener

                                                signUp.addEventListener('touchstart', (e) => {
                                                    switch (e.target.className) {
                                                        case 'btn-sign-in':
                                                        case 'label-sign-in':
                                                            let mailSign = document.getElementById('sign-mail');
                                                            if (mailSign.checkValidity()) {
                                                                mailSign = mailSign.value;
                                                            } else {
                                                                mailSign = 'Email isn\'t valid!';
                                                            }
                                                            if (mailSign.length === 0) {
                                                                mailSign = 'Email wasn\'t entered';
                                                            }
                                                            let passwordSign = document.getElementById('sign-password').value;
                                                            if (passwordSign.length === 0) {
                                                                passwordSign = 'Password was\'t entered';
                                                            }
                                                            alert(mailSign + '\n' + passwordSign);
                                                            break;
                                                        case 'sign':
                                                            signUp.style.animation = 'popupClose 1.5s alternate forwards';
                                                            setTimeout(() => {
                                                                signUp.remove()
                                                            }, 1500);
                                                            setTimeout(() => {
                                                                popUpModal = CreatePopUp();
                                                                popUpContainer.append(popUpModal);
                                                                popUpModal.style.animation = 'popupOpen 1.5s alternate forwards';
                                                            }, 1500);
                                                            break;
                                                    }
                                                }, true);
                                                break;

                                        }
                                    }
                                    let account = document.getElementsByClassName('burger-link')[4]
                                    account.style.color = 'grey';
                                    let popUpContainer = document.createElement('div');
                                    popUpContainer.className = 'pop-up-bg';
                                    let popUpModal = CreatePopUp();
                                    let pageContainer = document.querySelector('.container');
                                    setTimeout(() => {
                                        pageContainer.append(popUpContainer);
                                        popUpContainer.append(popUpModal);
                                        popUpModal.style.animation = 'popupOpen 1.5s alternate forwards';
                                        popUpContainer.addEventListener('touchstart', listener, true);
                                    }, 1500);
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

        //Desktop code!!!!

    } else {

        // Replacer links of elements for desktop version

        carouselItemsImg[0].attributes[1].nodeValue = path + "ocean-big.jpg";
        carouselItemsImg[1].attributes[1].nodeValue = path + "gates-big.jpg";
        carouselItemsImg[2].attributes[1].nodeValue = path + "bridge-big.jpg";
        dots[1].className = blockMarksOfDots.active;
        dots[0].className = blockMarksOfDots.inactive;
        imgStory[0].attributes[1].nodeValue = path + pathStory.cave[0];
        imgStory[1].attributes[1].nodeValue = path + pathStory.road[0];
        imgStory[2].attributes[1].nodeValue = path + pathStory.winter[0];
        imgStory[3].attributes[1].nodeValue = path + pathStory.car[0];
        for (let i = 0; i < 4; i++) {
            textStoryDivision[i].textContent = textStory.desktop;
        }

        // Listener of pop up menu for desktop version

        let popUpListener = () => {

            let popUpContainer = document.createElement('div');
            popUpContainer.className = 'pop-up-bg';

            let popUpModal = CreatePopUp();

            let pageContainer = document.querySelector('.container');
            pageContainer.append(popUpContainer);
            popUpContainer.append(popUpModal);
            popUpModal.style.animation = 'popupOpen 1.5s alternate forwards';
            popUpContainer.addEventListener('click', (eventData) => {
                switch (eventData.target.className) {
                    case 'pop-up-btn-facebook':
                    case 'facebook-img-pop-up':
                    case 'facebook-text-pop-up':
                        alert('Entrances with Facebook!');
                        break;
                    case 'pop-up-btn-google':
                    case 'google-img-pop-up':
                    case 'google-text-pop-up':
                        alert('Entrances with Google');
                        break;
                    case 'btn-sign-up':
                    case 'label-sign-up':
                        let mail = document.getElementById('mail');
                        if (mail.checkValidity()) {
                            mail = mail.value;
                        } else {
                            mail = 'Email isn\'t valid!';
                        }
                        if (mail.length === 0) {
                            mail = 'Email wasn\'t entered';
                        }
                        let password = document.getElementById('password').value;
                        if (password.length === 0) {
                            password = 'Password was\'t entered';
                        }
                        alert(mail + '\n' + password);
                        break;
                    case 'forgot-password':
                        alert('...page for recovery access account');
                        break;
                    case 'pop-up-bg':
                        let bgPopUp = document.querySelector('.pop-up-bg');
                        if (document.querySelector('.pop-up')) {
                            document.querySelector('.pop-up').style.animation = 'popupClose 1.5s alternate forwards';
                            setTimeout(() => {
                                bgPopUp.remove();
                            }, 1500);
                        } else {
                            document.querySelector('.sign-up').style.animation = 'popupClose 1.5s alternate forwards';
                            setTimeout(() => {
                                bgPopUp.remove();
                            }, 1500);
                        }
                        break;
                    case 'register':

                        // Change sign up from pop up

                        popUpModal.style.animation = 'popupClose 1.5s alternate forwards';
                        setTimeout(() => {
                            popUpModal.remove()
                        }, 1500);
                        let signUp = CreateSignUp();
                        setTimeout(() => {
                            popUpContainer.append(signUp);
                        }, 750);

                        // Event listener of sign up

                        signUp.addEventListener('click', (e) => {
                            switch (e.target.className) {
                                case 'btn-sign-in':
                                case 'label-sign-in':
                                    let mailSign = document.getElementById('sign-mail');
                                    if (mailSign.checkValidity()) {
                                        mailSign = mailSign.value;
                                    } else {
                                        mailSign = 'Email isn\'t valid!';
                                    }
                                    if (mailSign.length === 0) {
                                        mailSign = 'Email wasn\'t entered';
                                    }
                                    let passwordSign = document.getElementById('sign-password').value;
                                    if (passwordSign.length === 0) {
                                        passwordSign = 'Password was\'t entered';
                                    }
                                    alert(mailSign + '\n' + passwordSign);
                                    break;
                                case 'sign':
                                    signUp.style.animation = 'popupClose 1.5s alternate forwards';
                                    setTimeout(() => {
                                        signUp.remove()
                                    }, 1500);
                                    setTimeout(() => {
                                        popUpModal = CreatePopUp();
                                        popUpContainer.append(popUpModal);
                                        popUpModal.style.animation = 'popupOpen 1.5s alternate forwards';
                                    }, 1500);
                                    break;
                            }
                        }, true);
                        break;

                }
            }, true)
        }

        // Add event listener on login button

        let loginButton = document.querySelector('.btn-login');
        loginButton.addEventListener('click', popUpListener);
        let htmlPage = document.getElementsByTagName('html')[0];
        //Start carousel here
        carouselWorker();
    }
}

adaptive();