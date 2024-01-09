import { VideoController, VideoType } from './video-controller/video-controller';


const previewModalBox = document.querySelector('#preview-modal');
const previewModalWrapper = previewModalBox.closest('.preview-modal-wrapper');
const video = () => document.querySelector('#preview-video');
const volumeControl = previewModalBox.querySelector('.volume-control');
const videoPlayerSourceType = video().tagName === 'VIDEO' ? VideoType.HTML : VideoType.YOUTUBE;


const videoController = new VideoController(
    videoPlayerSourceType,
    'preview-video',
    () => {
        
    }, 
    () => {
        previewModalBox.dataset.videoPlaying = 1;
        previewModalBox.dataset.videoEnded = 0;
    },
    () => {
        previewModalBox.dataset.videoPlaying = 0;
        previewModalBox.dataset.videoEnded = 1;
        setMuted(true);
    }
);

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

const stopVideo = () => {
    try {
        videoController.pauseVideo();
        setMuted(true);
        previewModalBox.dataset.videoPlaying = 0;
    } catch {
        
    }
}

export const openPreviewModal = (elem) => {
    document.body.classList.add('preview-modal-opened');
    previewModalWrapper.dataset.opened = "1";
    previewModalWrapper.scrollTo({top: 0});
    previewModalBox.querySelector('img.cover').src = elem.querySelector('img').src.replace(/(vertical-)/g, '');
    previewModalBox.querySelector('img.logo').src = previewModalBox.querySelector('img.cover').src.replace(/(thumbs)/g, 'logos').replace(/(\.jpg)/g, '.webp').replace(/(-alt)/g, '');
    setTimeout(() => videoController.loadVideoById(elem.dataset.videoId), 1000);
    setMuted(true);
}

export const closePreviewModal = () => {
    document.body.classList.remove('preview-modal-opened');
    previewModalWrapper.dataset.opened = "0";
    stopVideo();
}

(() => {

    previewModalWrapper.addEventListener('click', (e) => {
        if (e.target !== previewModalWrapper) {
            return false;
        }

        closePreviewModal();
    });


    /**
     * Video Control
     */
    volumeControl.addEventListener('click', (e) => {
        videoController.playVideo();
        toggleMuted();
    });
})();