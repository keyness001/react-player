import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ReactAudioPlayer extends Component {
  componentDidMount() {
    const audio = this.audioEl;
    const {
      loop,
      loopAll,
      volume,
      onError,
      onCanPlay,
      onCanPlayThrough,
      onPlay,
      onAbort,
      onEnded,
      onPause,
      onSeeked,
      onLoadedMetadata,
      onVolumeChanged
    } = this.props;
    this.updateVolume(volume);

    audio.addEventListener('error', (e) => {
      onError(e);
    });

    // When enough of the file has downloaded to start playing
    audio.addEventListener('canplay', (e) => {
      onCanPlay(e);
    });

    // When enough of the file has downloaded to play the entire file
    audio.addEventListener('canplaythrough', (e) => {
      onCanPlayThrough(e);
    });

    // When audio play starts
    audio.addEventListener('play', (e) => {
      this.setListenTrack();
      onPlay(e);
    });

    // When unloading the audio player (switching to another src)
    audio.addEventListener('abort', (e) => {
      this.clearListenTrack();
      onAbort(e);
    });

    // When the file has finished playing to the end
    audio.addEventListener('ended', (e) => {
      this.clearListenTrack();
      onEnded(e, loop, loopAll);
    });

    // When the user pauses playback
    audio.addEventListener('pause', (e) => {
      this.clearListenTrack();
      onPause(e);
    });

    // When the user drags the time indicator to a new time
    audio.addEventListener('seeked', (e) => {
      onSeeked(e);
    });

    audio.addEventListener('loadedmetadata', (e) => {
      onLoadedMetadata(e);
    });

    audio.addEventListener('volumechange', (e) => {
      onVolumeChanged(e);
    });
  }

  componentWillReceiveProps(nextProps) {
    this.updateVolume(nextProps.volume);
  }

  /**
   * Set an interval to call props.onListen every props.listenInterval time period
   */
  setListenTrack() {
    if (!this.listenTracker) {
      const listenInterval = this.props.listenInterval;
      this.listenTracker = setInterval(() => {
        this.props.onListen(this.audioEl.currentTime);
      }, listenInterval);
    }
  }

  /**
   * Set the volume on the audio element from props
   * @param {Number} volume
   */
  updateVolume(volume) {
    if (typeof volume === 'number' && volume !== this.audioEl.volume) {
      this.audioEl.volume = volume;
    }
  }

  /**
   * Clear the onListen interval
   */
  clearListenTrack() {
    if (this.listenTracker) {
      clearInterval(this.listenTracker);
      this.listenTracker = null;
    }
  }

  render() {
    const incompatibilityMessage = this.props.children || (
      <p>Your browser does not support the <code>audio</code> element.</p>
    );

    // Set controls to be true by default unless explicity stated otherwise
    const controls = !(this.props.controls === false);

    // Set lockscreen / process audio title on devices
    const title = this.props.title ? this.props.title : this.props.src;

    // Some props should only be added if specified
    const conditionalProps = {};
    if (this.props.controlsList) {
      conditionalProps.controlsList = this.props.controlsList;
    }

    const {
      playList,
      playIndex,
      onShuffle,
    } = this.props;
    return (
      <div>
        <audio
          autoPlay={this.props.autoPlay}
          className={`react-audio-player ${this.props.className}`}
          controls={controls}
          loop={this.props.loop}
          muted={this.props.muted}
          onPlay={this.onPlay}
          preload={this.props.preload}
          ref={(ref) => { this.audioEl = ref; }}
          src={playList[playIndex].source[0].url}
          style={this.props.style}
          title={title}
          {...conditionalProps}
        >
          {incompatibilityMessage}
        </audio>
        <button type="button" onClick={onShuffle}>Shuffle</button>
      </div>
    );
  }
}

ReactAudioPlayer.defaultProps = {
  autoPlay: false,
  children: null,
  className: '',
  controls: false,
  controlsList: '',
  listenInterval: 10000,
  loop: false,
  loopAll: false,
  muted: false,
  onAbort: () => {},
  onCanPlay: () => {},
  onCanPlayThrough: () => {},
  onEnded: () => {},
  onError: () => {},
  onListen: () => {},
  onPause: () => {},
  onPlay: () => {},
  onSeeked: () => {},
  onVolumeChanged: () => {},
  onLoadedMetadata: () => {},
  preload: 'metadata',
  src: null,
  style: {},
  title: '',
  volume: 1.0,
  playIndex: 0,
  onPlayNext: () => {},
  onPlayPrev: () => {},
  onShuffle: () => {},
};

ReactAudioPlayer.propTypes = {
  autoPlay: PropTypes.bool,
  children: PropTypes.element,
  className: PropTypes.string,
  controls: PropTypes.bool,
  controlsList: PropTypes.string,
  listenInterval: PropTypes.number,
  loop: PropTypes.bool,
  muted: PropTypes.bool,
  onAbort: PropTypes.func,
  onCanPlay: PropTypes.func,
  onCanPlayThrough: PropTypes.func,
  onEnded: PropTypes.func,
  onError: PropTypes.func,
  onListen: PropTypes.func,
  onLoadedMetadata: PropTypes.func,
  onPause: PropTypes.func,
  onPlay: PropTypes.func,
  onSeeked: PropTypes.func,
  onVolumeChanged: PropTypes.func,
  preload: PropTypes.oneOf(['', 'none', 'metadata', 'auto']),
  src: PropTypes.string, // Not required b/c can use <source>
  style: PropTypes.objectOf(PropTypes.string),
  title: PropTypes.string,
  volume: PropTypes.number,
  playList: PropTypes.array,
  playIndex: PropTypes.number,
  loopAll: PropTypes.bool,
  onPlayNext: PropTypes.func,
  onPlayPrev: PropTypes.func,
  onShuffle: PropTypes.func,
};

export default ReactAudioPlayer;
