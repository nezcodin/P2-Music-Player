import { useEffect, useState } from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';
import axios from 'axios';

export const MusicPlayer = () => {
  const [token, setToken] = useState("");

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");

    if (!token && hash) {
      token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1];

      window.location.hash = "";
      window.localStorage.setItem("token", token);
    }

    setToken(token);
    console.log(`token: ${token}`)
  }, []);

  const [play, setPlay] = useState(false)
  const [songQueue, setSongQueue] = useState([])

  const addToQueue = (uri) => {
    setSongQueue((previousQueue) => [...previousQueue, uri])
  }

  useEffect(() => {
    console.log('Queue Updated: ', songQueue)
    nextSong = []
    setPlay(false)
    nextSong = songQueue
    setPlay(true)
  }, [songQueue])

  let nextSong = songQueue

  //Spotify SDK webplayback functionality
  return (
    <div className='full-container'>
      <div className='player-container'>
        <SpotifyPlayer
          token={token}
          autoPlay={false}
          showSaveIcon
          initialVolume={0.5}
          magnifySliderOnHover={true}
          uris={nextSong}
          callback={state => {
            if (!state.isPlaying) setPlay(false)
          }}
          play={play}
          className='spotify-player'
          styles={{
            activeColor: 'white',
            bgColor: '#5C86C0',
            color: 'white',
            loaderColor: '#3b639a',
            sliderColor: '#5d9fe3',
            sliderHandleColor: '#0f345b',
            trackArtistColor: '#5c86c0',
            trackNameColor: 'white',
          }}
        />
        <button onClick={() => addToQueue('spotify:track:3YjH3TIf5SOpFlnqlRdNAE')}> Add Song </button>
      </div>
    </div>
  )
}
