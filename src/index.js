const refs = {
    form: document.querySelector('#search-form'),
}

refs.form.addEventListener('submit', fnA);

function fnA(evt) {
    evt.preventDefault();
    const searchQuery = evt.currentTarget.elements.searchQuery.value;
    console.log(searchQuery);
    
    const BASE_URL = 'https://pixabay.com/api/';
    const QUERY_PARAMS = `&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&`;
    const key = '?key=29745254-668a4ef84f81b3be2971a230f';

    fetch(BASE_URL + key + QUERY_PARAMS).then(r => r.json()).then(console.log());
}

function getInputData() {
    console.log(evt.target.value);
}

// function createImageCard(obj) {
//     const markup = `
//         <div class="photo-card">
//         <img src="" alt="${obj.tags}" loading="lazy" />
//         <div class="info">
//             <p class="info-item">
//                 <b>Likes</b>${obj.likes}
//             </p>

//             <p class="info-item">
//                 <b>Views</b>${obj.views}
//             </p>

//             <p class="info-item">
//                 <b>Comments</b>${obj.comments}
//             </p>

//             <p class="info-item">
//                 <b>Downloads</b>${obj.downloads}
//             </p>
//         </div>
//         </div>`
// }


