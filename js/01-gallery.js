import { galleryItems } from './gallery-items.js';
// Change code below this line

const container = document.querySelector('.gallery');

const markup = createMarkup(galleryItems);

container.insertAdjacentHTML('beforeend', markup);
container.addEventListener('click', handleImgClick);

function createMarkup(arr) {
  return arr
    .map(({ preview, original, description }) => {
      return `<li class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`;
    })
    .join('');
}

function handleImgClick(event) {
  if (event.target.tagName !== 'IMG') {
    return;
  }
  event.preventDefault();
  const instance = basicLightbox.create(
    `
    <div class="modal">
        <img src="${event.target.dataset.source}" alt="${event.target.alt}"/>
          
    </div>`,
    {
      onShow: (instance) => {
        document.addEventListener('keydown', closeModal);
        instance.element().querySelector('IMG').onclick = instance.close;
      },
      onClose: (instance) => {
        document.removeEventListener('keydown', closeModal);
      },
    }
  );

  instance.show();
  function closeModal(event) {
    if (event.code === 'Escape') {
      instance.close();
    }
  }
}

console.log(galleryItems);
