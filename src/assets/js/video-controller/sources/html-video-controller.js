
export class HtmlVideoControler {
    targetElementId;
    player = null;
    onVideoPlayCallback;
    onVideoEndedCallback;

    constructor(targetElementId, onPlayerReadyCallback, onVideoPlayCallback, onVideoEndedCallback) {
        this.targetElementId = targetElementId;
        this.onVideoEndedCallback = onVideoEndedCallback;
        this.onVideoPlayCallback = onVideoPlayCallback;


        this.player = document.getElementById(targetElementId);
        setTimeout(onPlayerReadyCallback, 500);
    }

    attachEvents() {
        this.player.addEventListener('play', () => this.onVideoPlayCallback());
        this.player.addEventListener('ended', () => this.onVideoEndedCallback());
    }


    /**
     * Controls
     */
    playVideo() {
        this.player.play();
    }

    stopVideo() {
        this.pauseVideo();
    }

    pauseVideo() {
        this.player.pause();
    }

    muteVideo() {
        this.player.muted = 1;
    }

    unMuteVideo() {
        this.player.muted = 0;
        this.player.volume = 1;
    }

    toggleMuteVideo() {
        if (this.player.muted) {
            this.unMuteVideo()
        } else {
            this.muteVideo();
        } 
    }

    loadVideoById(id) {
        //nothing to do
    }

    loadVideoByUrl(url) {
        this.player.src = url;
    }
}