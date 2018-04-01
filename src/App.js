import React, { Component } from 'react';
import { shuffle } from 'lodash';
import ReactAudioPlayer from './ReactAudioPlayer';

class App extends Component {
  constructor(props) {
    super(props);
    this.initPlayList = [
      {
          title:'',
          artist: '',
          source: [
              {
                  url: 'https://zmp3-mp3-s1.zadn.vn/e5632269f42d1d73443c/3769102702777969994?authen=exp=1522572916~acl=/e5632269f42d1d73443c/*~hmac=eda20d25d035da34b334dc07e490d3e0',
                  label: '128kps'
              },{
                  url: 'https://zmp3-mp3-320s1.zadn.vn/6ddea9d47f9096cecf81/5564314860807015875?authen=exp=1522569533~acl=/6ddea9d47f9096cecf81/*~hmac=78477e0d0eb7019357cb661eeb150bae',
                  label: '320kps'
              }
          ],
          karaokeUrl: 'test.lrc'
      },
      {
        title:'',
        artist: '',
        source: [
            {
                url: 'https://zmp3-mp3-s1.zadn.vn/aff2b47361378869d126/5515390283663582634?authen=exp=1522570858~acl=/aff2b47361378869d126/*~hmac=0c06c10cff05f6df99e17ac25b4cf7eb',
                label: '128kps'
            },{
                url: 'https://zmp3-mp3-320s1.zadn.vn/fbc0e1413405dd5b8414/4827970486549941137?authen=exp=1522570858~acl=/fbc0e1413405dd5b8414/*~hmac=c2d347477f4fb88e8016905b89928aec',
                label: '320kps'
            }
        ],
        karaokeUrl: 'test1.lrc'
      }
    ]
    this.state = {
      currentQuality: '128kps',
      playIndex: 0,
      currentTime: 0,
      isShuffle: true,
      playList: this.initPlayList,
    }
  }

  handleShufflePlaylist = () => {
    const {
      playList,
      isShuffle
    } = this.state;
    const shufflePlaylist = shuffle(playList);
    if (isShuffle) {
      this.state.playList = shufflePlaylist;
    } else {
      this.state.playList = this.initPlayList;
    }
    this.forceUpdate();
  }

  handlePlayNext = () => {
    this.setState({
      playIndex: this.state.playIndex + 1,
      currentTime: 0
    })
  }

  handlePlayPrev = () => {
    this.setState({
      playIndex: this.state.playIndex - 1,
      currentTime: 0
    })
  }

  handleEnded = (e, isLoop, isLoopAll) => {
    const {
      playList,
      playIndex
    } = this.state;
    // Repeat
    if (!isLoop && playIndex !== playList.length - 1) {
      this.handlePlayNext();
    }
    // Repeat All
    if (isLoopAll && playIndex === playList.length - 1) {
      this.setState({
        playIndex: 0
      })
    }
  }

  handleSwitchQuality = (quality, currTime) => {
    console.log(currTime);
    this.setState({
      currentQuality: quality,
      currentTime: currTime,
    });
  }

  render() {
    const {
      playList,
      playIndex,
      currentQuality,
      currentTime,
    } = this.state;

    if (!Array.isArray(playList)) {
      return 'Loading';
    }

    const source = playList[playIndex].source;

    return (
      <div className="App">
        <ReactAudioPlayer
          quality={currentQuality}
          sources={source}
          currentTime={currentTime}
          controls
          autoPlay
          onPlayNext={this.handlePlayNext}
          onPlayPrev={this.handlePlayPrev}
          onEnded={this.handleEnded}
          onShuffle={this.handleShufflePlaylist}
          onSwitchQuality={this.handleSwitchQuality}
        />
      </div>
    );
  }
}
export default App;
