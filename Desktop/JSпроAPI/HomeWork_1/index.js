// Статическая веб-страница с динамическими элементами:
// Создайте HTML-страницу с заголовком "Расписание занятий".

// Таблица с информацией о занятиях:
// Используйте JavaScript для динамического создания таблицы на основе JSON-данных.
// Каждая строка таблицы должна содержать информацию о занятии: название, время проведения, максимальное и текущее количество участников.
// 3. Кнопки "Записаться" и "Отменить запись":

// Рядом с каждым занятием добавьте кнопку "Записаться".
// Если максимальное количество участников достигнуто, сделайте кнопку неактивной.
// Предусмотрите кнопку "Отменить запись", которая появляется после записи на занятие.
// 4. Интерактивность с JavaScript:

// При нажатии на кнопку "Записаться" увеличьте количество записанных участников.
// Если пользователь нажимает "Отменить запись", уменьшите количество записанных участников.
// Обновляйте состояние кнопок и количество участников в реальном времени.
// 5. Дополнительно: Хранение данных в Local Storage:

// Сохраняйте изменения в Local Storage, чтобы они сохранялись при перезагрузке страницы.


// Загрузка данных из Local Storage при загрузке страницы
document.addEventListener('DOMContentLoaded', fetchData);

async function fetchData() {
    try {
        let data;
        const storedData = localStorage.getItem('currentParticipants');
        if (storedData) {
            data = JSON.parse(storedData);
        } else {
            const response = await fetch("data.json");
            if (!response.ok) {
                throw new Error("Failed to fetch data from JSON");
            }
            data = await response.json();
        }

        const menu = document.querySelector(".menu");
        menu.innerHTML = '';

        data.forEach(({ id, name, time, maxParticipants, currentParticipants }) => {
            const infoClass = `
            <div class="container">
                <div class="infoClass">
                    <p class="infoClass__id">ID: ${id}</p>
                    <h3 class="infoClass__name">Класс: ${name}</h3>
                    <h4 class="infoClass__time">Время: ${time}</h4>
                    <p class="infoClass__max">Максимальное количество: <span class="max-value">${maxParticipants}</span></p>
                    <p class="infoClass__current">Зарегистрировано: <span class="current-value">${currentParticipants}</span></p>
                </div>
                <div class="btn">
                    <button class="btn__add btn__style">Записаться</button>
                </div>
            </div>`;
            menu.insertAdjacentHTML("beforeend", infoClass);
        });

        const btnAdd = document.querySelectorAll('.btn__add');
        const btnRemove = document.querySelectorAll('.btn__remove');
        btnAdd.forEach((btn, index) => {
            btn.addEventListener('click', () => {
                if (data[index].currentParticipants === data[index].maxParticipants) {
                    btn.style.display = 'none';
                } else {
                    const container = btn.closest('.container');
                    const btnRemove = document.createElement('button');
                    btnRemove.innerText = 'Отменить запись';
                    btnRemove.className = 'btn__style btn__remove';
                    container.querySelector('.btn').appendChild(btnRemove);

                    btn.addEventListener('click', () => {
                        const container = btn.closest('.container');
                        const current = container.querySelector('.current-value');
                        data[index].currentParticipants--;
                        current.innerText = data[index].currentParticipants.toString();
                        btn.style.display = 'none';
                        saveDataToLocalStorage(data);
                        data[index].currentParticipants++;
                        const current = container.querySelector('.current-value');
                        current.innerText = data[index].currentParticipants.toString();
                        saveDataToLocalStorage(data);
                    })
            }, { once: true });
        });


    }, { once: true });
});
    } catch (error) {
    console.error(error);
}
}

function saveDataToLocalStorage(data) {
    localStorage.setItem('currentParticipants', JSON.stringify(data));
}