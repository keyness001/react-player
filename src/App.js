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
                  url: 'https://zmp3-mp3-s1.zadn.vn/e5632269f42d1d73443c/3769102702777969994?authen=exp=1522414024~acl=/e5632269f42d1d73443c/*~hmac=3fe16527b9ca163804f6a71c66f12d82',
                  label: '128kps'
              },{
                  url: 'https://zmp3-mp3-320s1.zadn.vn/6ddea9d47f9096cecf81/5564314860807015875?authen=exp=1522483490~acl=/6ddea9d47f9096cecf81/*~hmac=a047f4f68eada71ee96aa964bba8d47a',
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
                url: 'https://zmp3-mp3-s1.zadn.vn/03738e675a23b37dea32/2313787426765899173?authen=exp=1522458169~acl=/03738e675a23b37dea32/*~hmac=3124ed44e311683bbb8c62f9a34e50e5',
                label: '128kps'
            },{
                url: 'https://zmp3-mp3-s1.zadn.vn/03738e675a23b37dea32/2313787426765899173?authen=exp=1522458169~acl=/03738e675a23b37dea32/*~hmac=3124ed44e311683bbb8c62f9a34e50e5',
                label: '320kps'
            }
        ],
        karaokeUrl: 'test1.lrc'
      },
      {
        title:'',
        artist: '',
        source: [
            {
                url: 'https://zmp3-mp3-s1.zadn.vn/03738e675a23b37dea32/2313787426765899173?authen=exp=1522458169~acl=/03738e675a23b37dea32/*~hmac=3124ed44e311683bbb8c62f9a34e50e5',
                label: '128kps'
            },{
                url: 'https://zmp3-mp3-s1.zadn.vn/03738e675a23b37dea32/2313787426765899173?authen=exp=1522458169~acl=/03738e675a23b37dea32/*~hmac=3124ed44e311683bbb8c62f9a34e50e5',
                label: '320kps'
            }
        ],
        karaokeUrl: 'test2.lrc'
      },
      {
        title:'',
        artist: '',
        source: [
            {
                url: 'https://zmp3-mp3-s1.zadn.vn/03738e675a23b37dea32/2313787426765899173?authen=exp=1522458169~acl=/03738e675a23b37dea32/*~hmac=3124ed44e311683bbb8c62f9a34e50e5',
                label: '128kps'
            },{
                url: 'https://zmp3-mp3-s1.zadn.vn/03738e675a23b37dea32/2313787426765899173?authen=exp=1522458169~acl=/03738e675a23b37dea32/*~hmac=3124ed44e311683bbb8c62f9a34e50e5',
                label: '320kps'
            }
        ],
        karaokeUrl: 'test3.lrc'
      }
    ]
    this.state = {
      playIndex: 0,
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
      playIndex: this.state.playIndex + 1
    })
  }

  handlePlayPrev = () => {
    this.setState({
      playIndex: this.state.playIndex - 1
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

  render() {
    const {
      playList,
      playIndex,
    } = this.state;

    if (!Array.isArray(playList)) {
      return 'Loading';
    }

    const source = playList[playIndex].source[0].url;

    return (
      <div className="App">
        <ReactAudioPlayer
          source={source}
          controls
          autoPlay
          onPlayNext={this.handlePlayNext}
          onPlayPrev={this.handlePlayPrev}
          onEnded={this.handleEnded}
          onShuffle={this.handleShufflePlaylist}
        />
      </div>
    );
  }
}
export default App;
