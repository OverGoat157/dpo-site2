// validation.js
// Валидация формы обратной связи на странице contacts.html

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('feedbackForm');
    if (!form) return;

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        // Сбрасываем предыдущие ошибки
        clearErrors();

        let isValid = true;

        // 1. Проверка ФИО (не пустое, минимум 2 слова)
        const fullname = document.getElementById('fullname');
        const fullnameValue = fullname.value.trim();
        const fullnameWords = fullnameValue.split(' ').filter(w => w.length > 0);

        if (fullnameValue === '') {
            showError(fullname, 'Введите фамилию и имя');
            isValid = false;
        } else if (fullnameWords.length < 2) {
            showError(fullname, 'Введите минимум 2 слова (фамилия и имя)');
            isValid = false;
        }

        // 2. Проверка телефона (не пустой, минимум 10 цифр)
        const phone = document.getElementById('phone');
        const phoneValue = phone.value.trim();
        const phoneDigits = phoneValue.replace(/\D/g, '');

        if (phoneValue === '') {
            showError(phone, 'Введите номер телефона');
            isValid = false;
        } else if (phoneDigits.length < 10) {
            showError(phone, 'Номер должен содержать не менее 10 цифр');
            isValid = false;
        }

        // 3. Проверка email (не пустой, базовый формат)
        const email = document.getElementById('email');
        const emailValue = email.value.trim();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (emailValue === '') {
            showError(email, 'Введите email адрес');
            isValid = false;
        } else if (!emailPattern.test(emailValue)) {
            showError(email, 'Введите корректный email (example@mail.ru)');
            isValid = false;
        }

        // 4. Проверка чекбокса согласия
        const consent = document.getElementById('consent');
        if (!consent.checked) {
            showCheckboxError(consent, 'Необходимо дать согласие на обработку данных');
            isValid = false;
        }

        // Если всё корректно — диспатчим событие и показываем успех
        if (isValid) {
            const formData = {
                fullname: fullnameValue,
                phone: phoneValue,
                email: emailValue,
                subject: document.getElementById('subject').value || '(не выбрано)',
                message: document.getElementById('message').value.trim() || '(не заполнено)'
            };

            // Отправляем кастомное событие для consoleLogger.js
            document.dispatchEvent(new CustomEvent('formValid', { detail: formData }));

            // Показываем сообщение об успехе
            form.classList.add('hidden');
            const successMsg = document.getElementById('successMsg');
            if (successMsg) successMsg.classList.remove('hidden');
        }
    });

    // Сброс ошибки при вводе в поле
    form.querySelectorAll('input, textarea, select').forEach(function (input) {
        input.addEventListener('input', function () {
            clearFieldError(this);
        });
        input.addEventListener('change', function () {
            clearFieldError(this);
        });
    });

    // ─── Вспомогательные функции ───────────────────────────────────────────

    // Показать ошибку под полем ввода
    function showError(input, message) {
        input.classList.add('border-red-500');
        input.classList.remove('border-gray-300');

        // Удаляем старую ошибку для этого поля, если есть
        const existing = input.parentNode.querySelector('.error-msg');
        if (existing) existing.remove();

        const err = document.createElement('p');
        err.classList.add('error-msg', 'text-red-500', 'text-xs', 'mt-1');
        err.textContent = message;
        input.parentNode.appendChild(err);
    }

    // Показать ошибку для чекбокса (вставляем после label)
    function showCheckboxError(input, message) {
        const wrapper = input.closest('div');
        const existing = wrapper.querySelector('.error-msg');
        if (existing) existing.remove();

        const err = document.createElement('p');
        err.classList.add('error-msg', 'text-red-500', 'text-xs', 'mt-1');
        err.textContent = message;
        wrapper.appendChild(err);
    }

    // Убрать ошибку с конкретного поля
    function clearFieldError(input) {
        input.classList.remove('border-red-500');
        input.classList.add('border-gray-300');

        const parent = input.closest('div');
        if (parent) {
            parent.querySelectorAll('.error-msg').forEach(el => el.remove());
        }
    }

    // Убрать все ошибки формы
    function clearErrors() {
        form.querySelectorAll('.error-msg').forEach(el => el.remove());
        form.querySelectorAll('.border-red-500').forEach(el => {
            el.classList.remove('border-red-500');
            el.classList.add('border-gray-300');
        });
    }
});
