'use strict';
document.addEventListener('DOMContentLoaded', () => {
    const smoothLinks = document.querySelectorAll('a[href^="#"]');
    for (let smoothLink of smoothLinks) {
        smoothLink.addEventListener('click', function (e) {
            e.preventDefault();
            const id = smoothLink.getAttribute('href');
            document.querySelector(id).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    };

    const mask = (selector) => {

    let setCursorPosition = (pos, elem) => {
        elem.focus();

        if(elem.setSelectionRange) {
            elem.setSelectionRange(pos, pos);
        } else if (elem.createTextRange) {
            let range = elem.createTextRange();

            range.collapse(true);
            range.moveEnd('character', pos);
            range.moveStart('character', pos);
            range.select();
        }
    };

    function createMask(event) {
        let matrix = '+7 (___) ___-__-__',
            i = 0,
            def = matrix.replace(/\D/g, ''),
            val = this.value.replace(/\D/g, '');

        if(def.length >= val.length) {
            val = def;
        }

        this.value = matrix.replace(/./g, function(a) {
            return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;
        });

        if(event.type === 'blur') {
            if(this.value.length == 2)  {
                this.value = '';
            }
        } else {
            setCursorPosition(this.value.length, this);
        }
    }

    let inputs = document.querySelectorAll(selector);

    inputs.forEach(input => {
        input.addEventListener('input', createMask);
        input.addEventListener('focus', createMask);
        input.addEventListener('blur', createMask);
    });
};

    const checkTextInputs = (selector) => {
        const txtInputs = document.querySelectorAll(selector);

        txtInputs.forEach(item => {
            item.addEventListener('keypress', e => {
                if(e.key.match(/[^а-яё 0-9]/ig)) {
                    e.preventDefault();
                }
            });
            item.addEventListener('input', e => {
                e.target.value = e.target.value.replace(/[a-z]/gi,'');
            });
        });
    };
    checkTextInputs('.main-info__input-number');
    mask('.main-info__input-number');

    document.querySelector('form').addEventListener('submit', (e) => {
        e.preventDefault();
        const inputs = document.querySelectorAll('input');
        let formData = new FormData(e.target)

        const formSend = async () => {

            let response = await fetch('send.php', {
                method: 'POST',
                body: formData
            })

            if(response.ok) {
               e.target.reset()
            }
        }

        formSend();
    })
})