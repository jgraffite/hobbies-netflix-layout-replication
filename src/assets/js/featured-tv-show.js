
(() => {
    const featuredBox = document.querySelector('#featured-show-box');
    const featuredVideo = document.querySelector('#featured-video');
    const volumeControl = featuredBox.querySelector('.volume-control');

    function isInViewport(el, offsetH = 0) {
        const rect = el.getBoundingClientRect();
        const vWidth = window.innerWidth || doc.documentElement.clientWidth;
        const vHeight = window.innerHeight || doc.documentElement.clientHeight;

        if (rect.right < 0 || rect.bottom < 0 || rect.left > vWidth || (rect.top - offsetH) > vHeight)
            return false;

        return true;
    }

    const setMuted = (muted) => {
        if (muted === undefined) {
            muted = Number(!Boolean(Number(volumeControl.dataset.muted)));
        }

        volumeControl.dataset.muted = muted ? "1" : "0";
        featuredVideo.muted = muted;
    }

    const toggleMuted = () => {
        setMuted();
    }

    volumeControl.addEventListener('click', (e) => {
        featuredVideo.play();
        toggleMuted();
        featuredVideo.volume = 1;
    });

    featuredVideo.addEventListener('play', () => {
        featuredBox.dataset.videoEnded = 0;
    });

    featuredVideo.addEventListener('ended', () => {
        featuredBox.dataset.videoEnded = 1;
        featuredVideo.dataset.autoPlayFinished = 1;
        setMuted(true);
    });
    
    window.addEventListener('scroll', (e) => {
        if (featuredVideo.dataset.autoPlayFinished === "1")
            return;

        isInViewport(featuredVideo) ?
            featuredVideo.play()
            :
            featuredVideo.pause();
    });

})();