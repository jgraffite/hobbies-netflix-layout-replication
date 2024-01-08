
const SCRIPT_ID = 'youtube-video-embedder-script';
const EVENT_NAME = 'onYoutubeApiReady';

export class YoutubeVideoControler {
    targetElementId;
    player = null;
    onPlayerReadyCallback;
    onVideoPlayCallback;
    onVideoEndedCallback;

    constructor(targetElementId, onPlayerReadyCallback, onVideoPlayCallback, onVideoEndedCallback) {
        this.targetElementId = targetElementId;
        this.onPlayerReadyCallback = onPlayerReadyCallback;
        this.onVideoEndedCallback = onVideoEndedCallback;
        this.onVideoPlayCallback = onVideoPlayCallback;
        
        this.start();
    }

    static onYouTubeIframeAPIReady() {
        document.dispatchEvent(window.YoutubeApiReadyEvent);
    }

    static loadApi() {
        window.YoutubeApiReadyEvent = new Event(EVENT_NAME);

        this.createScriptTag();
    }

    static createScriptTag() {
        if (document.getElementById(SCRIPT_ID)) {
            return false;
        }

        window.onYouTubeIframeAPIReady = () => YoutubeVideoControler.onYouTubeIframeAPIReady();

        var tag = document.createElement('script');
        tag.id = SCRIPT_ID;
        tag.src = "https://www.youtube.com/iframe_api";
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }

    start() {
        if (typeof YT !== 'undefined') {
            this.buildVideoPlayer();
        } else {
            document.addEventListener(EVENT_NAME, () => this.buildVideoPlayer());
        }
    }

    buildVideoPlayer() {
        this.player = new YT.Player(this.targetElementId, {
            //height: '300',
            //width: '640',
            //videoId: 'snYu2JUqSWs',
            //origin: 'http://localhost:8080/',
            playerVars: {
                //mute: 1,
                //autoplay: 1,
                controls: 0,
                showinfo: 0,
                modestbranding: 1,
                rel: 0,
            },
            events: {
                'onReady': () => this.onPlayerReady(),
                'onStateChange': (e) => this.onPlayerStateChange(e)
            }
        });
    }


    /*
     * Events
     */
    onPlayerReady() {
        this.onPlayerReadyCallback();
    }

    onPlayerStateChange(event) {
        if (event.data == YT.PlayerState.ENDED) {
            this.onVideoEndedCallback();
        } else if (event.data == YT.PlayerState.PLAYING) {
            this.onVideoPlayCallback();
        }
    }


    /**
     * Controls
     */
    playVideo() {
        try {
            this.player?.playVideo();
        } catch (e) {

        }
    }

    stopVideo() {
        try {
            this.player?.stopVideo();
        } catch (e) {
            
        }
    }

    pauseVideo() {
        try {
            this.player?.pauseVideo();
        } catch (e) {
            
        }
    }

    muteVideo() {
        try {
            this.player?.mute();
            return true;
        } catch (e) {
            return false;
        }
    }

    unMuteVideo() {
        try {
            this.player?.unMute();
            return true;
        } catch (e) {
            return false;
        }
    }

    toggleMuteVideo() {
        try {
            if (this.player?.isMuted()) {
                this.player?.unMute();
                return true;
            } else {
                this.player?.mute();
                return true;
            } 
        } catch (e) {
            return false;
        }  
    }

    loadVideoById(videoId) {
        try {
            this.player?.loadVideoById({videoId});
        } catch (e) {
            
        }
    }

    loadVideoByUrl(videoUrl) {
        try {
            this.player?.loadVideoById({mediaContentUrl: videoUrl});
        } catch (e) {
            
        }
    }

}