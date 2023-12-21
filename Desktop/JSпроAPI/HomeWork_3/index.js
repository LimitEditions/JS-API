document.addEventListener('DOMContentLoaded', fetchImage);

async function fetchImage() {
    try {

        const responce = await fetch(`https://api.unsplash.com/photos/?per_page50&client_id=eQwruVhlXWBmqI3xLILgR5vv8SdkMhHWJCdaq4cWyYU`);
        const photos = await responce.json();
        return photos;
    } catch (error) {
        console.error('Ошибка при загрузке фотографий: ', error);
        return [];
    }
}
// загрузка картинок с сайта
async function loadImages() {
    const response = await fetchImage();
    response.forEach(element => {
        const containerCard = document.querySelector('.container-card');
        const newImg = document.createElement('div');
        newImg.innerHTML = `<div class="container-img">
        <img src="${element.urls.small}" alt="Image" class="img">
        <h2 class="authorName">Author: ${element.user.name}</h2>
        <div class="like">
          <div class="like__img"><svg viewBox="0 0 24 24" fill="none"
          xmlns="http://www.w3.org/2000/svg"><g
              id="SVGRepo_bgCarrier" stroke-width="0"></g><g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"></g><g
              id="SVGRepo_iconCarrier"> <g
                  id="style=fill"> <g id="heart"> <path
                          id="Subtract"
                          fill-rule="evenodd"
                          clip-rule="evenodd" d="M7.56
                          2.3501C4.07229 2.3501 1.25
                          5.18939 1.25 8.6901C1.25 12.4396
                          2.98932 15.4002 5.06577
                          17.5277C7.13169 19.6444 9.57655
                          20.9862 11.1343 21.5187C11.4086
                          21.6148 11.7227 21.6501 12
                          21.6501C12.2773 21.6501 12.5914
                          21.6148 12.8657 21.5187C14.4235
                          20.9862 16.8683 19.6444 18.9342
                          17.5277C21.0107 15.4002 22.75
                          12.4396 22.75 8.6901C22.75
                          5.18939 19.9277 2.3501 16.44
                          2.3501C14.7122 2.3501 13.1385
                          3.05574 12.0003 4.19481C10.8646
                          3.05608 9.29674 2.3501 7.56
                          2.3501ZM20.2156 11.1952C20.3396
                          10.8 20.1197 10.3791 19.7245
                          10.2551C19.3293 10.1311 18.9084
                          10.3509 18.7844 10.7461C18.0447
                          13.1036 16.5095 15.0083 14.8443
                          16.4296C14.5292 16.6985 14.4918
                          17.1719 14.7607 17.487C15.0297
                          17.802 15.503 17.8394 15.8181
                          17.5705C17.6284 16.0254 19.3678
                          13.8971 20.2156 11.1952Z"
                          fill="darkslategrey"></path></g>
              </g> </g></svg></div>
          <p class="like__count">0</p>
        </div>
      </div>`;
        containerCard.appendChild(newImg);

    });

    // Добавляем прослушивание событий при каждом нажатии на лайк
    const likes = document.querySelectorAll('.like__img');
    likes.forEach((like, index) => {
        
        like.addEventListener('click', () => {
            const count = like.nextElementSibling;
            countLike = parseInt(count.textContent);
            countLike++;
            count.textContent = countLike;

            // добавление в LocalStorage
            const existingLikes = JSON.parse(localStorage.getItem(`likes_${index}`)) || {};
            existingLikes[index] = countLike;
            localStorage.setItem(`likes_${index}`, JSON.stringify(existingLikes));
        });
    });

}
// догрузка картинок при прокрутке
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        loadImages();
    }
});

loadImages();

