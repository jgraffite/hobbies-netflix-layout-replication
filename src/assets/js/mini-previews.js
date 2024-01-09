import { VideoController, VideoType } from './video-controller/video-controller';
import {openPreviewModal} from "./preview-tv-show.js";


const miniPreviewbox = document.querySelector('#mini-preview');
const video = () => document.querySelector('#mini-preview-video');
const volumeControl = miniPreviewbox.querySelector('.volume-control');
const videoPlayerSourceType = video().tagName === 'VIDEO' ? VideoType.HTML : VideoType.YOUTUBE;


const videoController = new VideoController(
    videoPlayerSourceType,
    'mini-preview-video',
    () => {
        videoController.muteVideo();
        videoController.playVideo();
    }, 
    () => {
        miniPreviewbox.dataset.videoEnded = 0;
    },
    () => {
        miniPreviewbox.dataset.videoEnded = 1;
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
    } catch {
        
    }
}

const closeMiniPreviewBox = () => {
    miniPreviewbox.dataset.videoEnded = 1;
    miniPreviewbox.classList.remove('showed');
    setTimeout(() => {
        miniPreviewbox.style.top = `-100vw`;
        miniPreviewbox.style.left = `-100vh`;
    }, 500);

    stopVideo();
}


export const buildMiniPreviews = () => {
    var timeout, timeout2;
    document.querySelectorAll('.tv-show-mini-preview').forEach(item => {

        item.addEventListener('click', (e) => {
            e.preventDefault();
            closeMiniPreviewBox();
            openPreviewModal(item);
        });

        item.addEventListener('mouseover', () => {

            if (window.scrollY === 0) {
                return false;
            }

            clearTimeout(timeout);
            clearTimeout(timeout2);
            miniPreviewbox.dataset.videoEnded = 1;

            timeout = setTimeout(() => {
                miniPreviewbox.querySelector('img.cover').src = item.querySelector('img').src.replace(/(vertical-)/g, '');
                miniPreviewbox.querySelector('img.logo').src = miniPreviewbox.querySelector('img.cover').src.replace(/(thumbs)/g, 'logos').replace(/(\.jpg)/g, '.webp').replace(/(-alt)/g, '');
                if (videoPlayerSourceType === VideoType.HTML) {
                    video().poster = item.querySelector('img').src;
                }
            }, 500);

            timeout = setTimeout(() => {
                if (item.dataset.videoId) {
                   setTimeout(() => videoController.loadVideoById(item.dataset.videoId), 100);
                }
                if (videoPlayerSourceType === VideoType.HTML) {
                    if (item.dataset.videoUrl) {
                        videoController.loadVideoByUrl(item.dataset.videoUrl);
                        //video().src = item.dataset.videoUrl;
                    }
                }

                miniPreviewbox.classList.remove('showed');
                const rect = item.getBoundingClientRect();
                const vWidth = window.scrollX;
                const vHeight = window.scrollY;
        
                var left = (rect.left + vWidth);
                const top = (rect.top + vHeight);

                const width = rect.width + (rect.width * 0.5);

                const right = (left + width);
                const widthPassed = right - window.innerWidth;

                //left = left - 10;

                //console.log('left', left, 'rect.left', rect.left);
                
                // if (left < 100) {
                //     left = 100;
                // }
                // if (left < rect.left) {
                //     left = rect.left + 100;
                // }

                if (right > window.innerWidth) {
                    left -= (widthPassed * 0.5);
                }

                miniPreviewbox.style.width = `${width}px`;
    
                miniPreviewbox.classList.add('showed');
                miniPreviewbox.style.top = `${top}px`;
                miniPreviewbox.style.left = `${left}px`;
            }, 600);
            //setTimeout(videoController.playVideo, 1500);
        });

        item.addEventListener('mouseleave', () => {
            miniPreviewbox.dataset.videoEnded = 1;
            clearTimeout(timeout);  
            clearTimeout(timeout2);
        });
    });

    miniPreviewbox.addEventListener('mouseleave', () => closeMiniPreviewBox());
}

(() => {
    /**
     * Video Control
     */

    volumeControl.addEventListener('click', (e) => {
        videoController.playVideo();
        toggleMuted();
    });
})();