'use strict';

let ytURL = /(?:https?:\/\/)?(?:www.|m.)?youtu(?:be\.com|\.be)\/(?:watch\?v=)?([a-z0-9_]+)(?:\?|&)?(new=1|new=true)?/i;
let pList = document.querySelectorAll('p');

let createRealPlayer = function (element, youTubeId) {
    let width = element.clientWidth;
    let height = element.clientHeight;
    let template = `<iframe
            width="${width}" height="${height}"
            src="https://www.youtube.com/embed/${youTubeId}?rel=0&showinfo=0&autoplay=1"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen>
        </iframe>`;

    element.innerHTML = template;
}

let assignHandlers = function (element, youTubeId) {
    let videoCover = element.querySelector('.video-cover');
    let videoButton = element.querySelector('.video-button');

    videoCover.addEventListener('click', function (evt) {
        evt.preventDefault();
        createRealPlayer(element, youTubeId);
    });

    videoButton.addEventListener('click', function (evt) {
        evt.preventDefault();
        createRealPlayer(element, youTubeId);
    });
}

let createFakePlayer = function (youTubeId, isNewWindow)  {
    let playerWrapper = document.createElement('div');
    let template = `<div class="video-player">
                <a class="video-cover" href="https://youtu.be/${youTubeId}" target="_blank">
                    <picture>
                        <source srcset="https://i.ytimg.com/vi_webp/${youTubeId}/sddefault.webp" type="image/webp">
                        <img class="video-image" src="https://i.ytimg.com/vi/${youTubeId}/sddefault.jpg" alt="">
                    </picture>
                </a>
                <a class="video-button" href="https://youtu.be/${youTubeId}" target="_blank">
                    <svg width="68" height="48" viewBox="0 0 68 48">
                        <path class="video-button-shape" d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z"></path><path class="video-button-icon" d="M 45,24 27,14 27,34"></path>
                    </svg>
                </a>
            </div>`;

    playerWrapper.innerHTML = template;
    playerWrapper.classList.add('video-wrapper');

    if (isNewWindow) {
        assignHandlers(playerWrapper, youTubeId);
    }

    return playerWrapper;
};

pList.forEach((element) => {
    let ytMatch = element.innerText.match(ytURL);
    if (!ytMatch) {
        return;
    }

    element.innerHTML = '';
    element.appendChild(createFakePlayer(ytMatch[1], !ytMatch[2]));
});