// consoleLogger.js
// Слушает кастомное событие formValid от validation.js
// и выводит данные формы в консоль браузера

document.addEventListener('DOMContentLoaded', function () {

    document.addEventListener('formValid', function (event) {
        const formData = event.detail;

        // Очищаем консоль для наглядности
        console.clear();

        console.log('=== Данные формы FreshBox ===');
        console.log('ФИО:        ', formData.fullname);
        console.log('Телефон:    ', formData.phone);
        console.log('Email:      ', formData.email);
        console.log('Тема:       ', formData.subject);
        console.log('Сообщение:  ', formData.message);
        console.log('----------------------------');

        // Время отправки
        const timestamp = new Date().toLocaleString('ru-RU');
        console.log('Время отправки:', timestamp);

        // Вывод объектом (удобно для копирования)
        console.table({
            'ФИО': formData.fullname,
            'Телефон': formData.phone,
            'Email': formData.email,
            'Тема': formData.subject,
            'Сообщение': formData.message,
            'Время': timestamp
        });
    });

});
