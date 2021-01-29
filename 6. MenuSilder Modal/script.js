var toogleMenuBtn = document.querySelector('.toggle');
var signUpBtn = document.querySelector('.cta-btn');
var modalContainer = document.querySelector('.modal-container');
var closeBtn = document.querySelector('.close-btn');

toogleMenuBtn.addEventListener('click', () => {
    document.querySelector('body').classList.toggle('show-nav')
});

signUpBtn.addEventListener('click', () => {
    modalContainer.classList.toggle('show');
});

closeBtn.addEventListener('click', () => {
    modalContainer.classList.remove('show');
});

window.addEventListener('click', (e) => {
    e.target == modalContainer ? modalContainer.classList.remove('show') : false;
})