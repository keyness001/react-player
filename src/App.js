import React, { Component } from 'react';
import ReactAudioPlayer from './ReactAudioPlayer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <ReactAudioPlayer
          src='https://zmp3-mp3-s1.zadn.vn/e5632269f42d1d73443c/3769102702777969994?authen=exp=1522414024~acl=/e5632269f42d1d73443c/*~hmac=3fe16527b9ca163804f6a71c66f12d82'
          autoPlay
          controls
        />
      </div>
    );
  }
}

export default App;
