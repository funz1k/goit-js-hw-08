// Add imports above this line
import { galleryItems } from './gallery-items';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
// Change code below this line

const galleryList = document.querySelector('.gallery')

const markup = galleryItems.map(({ preview, original, description }) => {
    return `
        <a class="gallery__item" href="${original}">
    <img
        class="gallery__image"
        src="${preview}"
        alt="${description}"
    />
        </a>
    `
}).join('')

galleryList.insertAdjacentHTML('afterbegin', markup);

new SimpleLightbox('.gallery a', { overlayOpacity: 0.8, captionsData: 'alt', captionDelay: 250, showCounter: false });


