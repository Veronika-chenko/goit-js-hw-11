import { refs } from './index';


export default function renderImageCards(images) {
    const card = images.map(img => {
        return `
        <div class="photo-card">
        <a href="${img.largeImageURL}" class="gallery-link">
            <img src="${img.webformatURL}" alt="${img.tags}" loading="lazy" />
        </a>
        <div class="info">
            <p class="info-item">
                <b>Likes</b>${img.likes}
            </p>
            <p class="info-item">
                <b>Views</b>${img.views}
            </p>
            <p class="info-item">
                <b>Comments</b>${img.comments}
            </p>
            <p class="info-item">
                <b>Downloads</b>${img.downloads}
            </p>
        </div>
        </div>`
    }).join("");
    refs.galleryContainer.innerHTML = card;
}
