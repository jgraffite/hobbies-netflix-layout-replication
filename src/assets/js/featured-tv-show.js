import { VideoController, VideoType } from './video-controller/video-controller';

(() => {
    const featuredBox = document.querySelector('#featured-show-box');
    const volumeControl = featuredBox.querySelector('.volume-control');
    const featuredVideo = () => document.querySelector('#featured-video');
    const videoPlayerSourceType = featuredVideo().tagName === 'VIDEO' ? VideoType.HTML : VideoType.YOUTUBE;

    VideoController.loadYoutubeApi();

    if (videoPlayerSourceType === VideoType.YOUTUBE) {
        featuredBox.dataset.videoEnded = 1;
    }
    
    const videoController = new VideoController(
        videoPlayerSourceType,
        'featured-video',
        () => {
            videoController.loadVideoById(featuredVideo().dataset.videoId);
            videoController.muteVideo();
            videoController.playVideo();
        }, 
        () => {
            //playing
            featuredBox.dataset.videoEnded = 0;
        },
        () => {
            featuredBox.dataset.videoEnded = 1;
            featuredVideo().dataset.autoPlayFinished = 1;
            setMuted(true);
        }
    );

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

        const success = muted ? videoController.muteVideo() : videoController.unMuteVideo();
        if (success) {
            volumeControl.dataset.muted = muted ? "1" : "0";
        }
    }

    const toggleMuted = () => {
        setMuted();
    }

    volumeControl.addEventListener('click', (e) => {
        videoController.playVideo();
        toggleMuted();
    });
    
    window.addEventListener('scroll', (e) => {

        if (!featuredVideo()) {
            return false;
        }

        if (featuredVideo().dataset.autoPlayFinished === "1")
            return;

        isInViewport(featuredVideo()) ?
            videoController.playVideo()
            :
            videoController.pauseVideo();
    });
})();