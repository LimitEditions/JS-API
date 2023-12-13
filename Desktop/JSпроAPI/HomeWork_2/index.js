// Вашей задачей является создание веб-слайдера для отображения изображений на веб-странице.

// 1. Создайте интерфейс веб-страницы, который включает в себя следующие элементы:

// a. Контейнер для отображения текущего изображения.
// b. Кнопки "Предыдущее изображение" и "Следующее изображение" для переключения между изображениями.
// c. Навигационные точки (индикаторы) для быстрого переключения между изображениями.

// 2. Используйте HTML для создания элементов интерфейса.

// 3. Используйте JavaScript для обработки событий:

// a. При клике на кнопку "Предыдущее изображение" должно отображаться предыдущее изображение.
// b. При клике на кнопку "Следующее изображение" должно отображаться следующее изображение.
// c. При клике на навигационные точки, слайдер должен переключаться к соответствующему изображению.

// 4. Слайдер должен циклически переключаться между изображениями, то есть после последнего изображения должно отображаться первое, и наоборот.

// 5. Добавьте стилизацию для слайдера и элементов интерфейса с использованием CSS для улучшения внешнего вида.


let slide = 0;
const back = document.querySelector('.back');
const forward = document.querySelector('.forward');
const img = document.querySelectorAll('.img__card');
const dots = document.querySelectorAll('.dot__number');

function showSlide(slide) {
    for(let i = 0; i < img.length; i++) {
        img[i].classList.add('hidden');
    }
    img[slide].classList.remove('hidden');
    dots[slide].classList.add('active');
}

back.addEventListener('click', () => {
    slide = (slide - 1 + img.length) % img.length;
    showSlide(slide);
})

forward.addEventListener('click', () => {
    slide = (slide + 1 + img.length) % img.length;
    showSlide(slide);
})

dots.forEach(dot => {
    dot.addEventListener('click', () => {
        slide = Number(dot.innerText - 1);
        showSlide(slide);
    })
});

showSlide(slide);