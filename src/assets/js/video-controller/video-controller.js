import { HtmlVideoControler } from "./sources/html-video-controller";
import { YoutubeVideoControler } from "./sources/youtube-video-controller";

export class VideoType {
    static HTML = 'HTML';
    static YOUTUBE = 'HTYOUTUBEML';
}

export class VideoController {
    instance;

    constructor(sourceType, targetElementId, onPlayerReadyCallback, onVideoPlayCallback, onVideoEndedCallback) {
        const instancer = sourceType === VideoType.HTML ? HtmlVideoControler : YoutubeVideoControler;
        this.instance = new instancer(targetElementId, onPlayerReadyCallback, onVideoPlayCallback, onVideoEndedCallback);
    }

    static loadYoutubeApi() {
        YoutubeVideoControler.loadApi();
    }

    /**
     * Controls
     */
    playVideo() {
        this.instance.playVideo();
    }

    stopVideo() {
        this.instance.stopVideo();
    }

    pauseVideo() {
        this.instance.pauseVideo();
    }

    muteVideo() {
        return this.instance.muteVideo();
    }

    unMuteVideo() {
        return this.instance.unMuteVideo();
    }

    toggleMuteVideo() {
        return this.instance.toggleMuteVideo();
    }

    loadVideoById(id) {
        this.instance.loadVideoById(id);
    }

    loadVideoByUrl(url) {
        this.instance.loadVideoByUrl(url);
    }
}