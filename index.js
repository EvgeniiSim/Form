const customSelect = () => {
    const elements = document.querySelectorAll('.custom-select');

    elements.forEach(el => {
        const customSelect = new Choices(el, {
            searchEnabled: false,
            itemSelectText: '',
        });
    })

}
customSelect()


const filePreview = () => {
    const container = document.querySelector('.form__file-inner');
    const input = document.querySelector('.input__file');
    input.addEventListener('change', filePreview);

    function filePreview() {
        ///// Считаем количество файлов
        for (let i = 0; i < input.files.length; i++) {
            ///// Получаем превью itemes
            const imgSrc = URL.createObjectURL(input.files[i]);
            const newItem = createNewItem(imgSrc);
            container.appendChild(newItem);
        }

        ///// Не даем выбрать файл при клике на превью
        const itemsPreview = document.querySelectorAll('#preview-item');
        if (itemsPreview) {
            itemsPreview.forEach(item => {
                item.addEventListener('click', (e) => {
                    e.preventDefault();
                });
            })
        }

        ///// Убираем превью
        if (document.querySelectorAll('#preview-item')) {
            const previewItems = Array.from(document.querySelectorAll('#preview-item'));
            const minusIcons = document.querySelectorAll('.form__file-icon-minus');
            minusIcons.forEach(icon => {
                icon.addEventListener('click', function (e) {
                    ///// Удаляем превью
                    const currentPreview = icon.closest('#preview-item');
                    currentPreview.remove();
                })
            })
        }

        function createNewItem(imgSrc) {
            const item = document.createElement('div');
            item.classList.add('form__file-item');
            item.setAttribute('id', "preview-item");

            const minusIcon = document.createElement('img');
            minusIcon.classList.add('form__file-icon');
            minusIcon.classList.add('form__file-icon-minus');
            minusIcon.src = 'icons/minus.svg';

            const imgSelected = document.createElement('img');
            imgSelected.classList.add('form__file-preview');
            imgSelected.src = imgSrc;
            item.appendChild(minusIcon);
            item.appendChild(imgSelected);

            return item
        }
    }
}

filePreview()

const popup = document.querySelector('.popup');
const form = document.querySelector('.form');

form.addEventListener('submit', () => {
    popup.classList.add('_open');
})

document.body.addEventListener('click', (e) => {
    if (!e.target.closest('.popup__inner')) {
        popup.classList.remove('_open');
    }
})