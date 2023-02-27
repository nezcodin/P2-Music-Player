import './App.css';
import { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { Main } from './components/Main';
import SpotifyPlayer from 'react-spotify-web-playback'

//Resources:
//  Getting started with using OAuth for Spotify: https://dev.to/dom_the_dev/how-to-use-the-spotify-api-in-your-react-js-app-50pn


function App() {

  const CLIENT_ID = '4b53edf8d3184c88ad99c1105531b262'
  const REDIRECT_URI = "http://localhost:3000"
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
  const SCOPES = [
    'streaming',
    'user-read-email',
    'user-read-private',
    'user-library-read',
    'user-library-modify',
    'user-read-playback-state',
    'user-modify-playback-state'
  ];
  const RESPONSE_TYPE = "token"

  const [token, setToken] = useState("")

  useEffect(() => {
    //get access token from URL
    const hash = window.location.hash
    let token = window.localStorage.getItem("token")

    if (!token && hash) {
      token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]

      window.location.hash = ""
      window.localStorage.setItem("token", token)
    }

    setToken(token)
    console.log('Connected.')
  }, [])


  const logout = () => {
    //removes access token to log out
    setToken("")
    window.localStorage.removeItem("token")
  }


  return (
    <div className="App">

      <h1>SoundScape</h1>

      <div className='spotify-auth'>
        {!token ?
          <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login
            to Spotify</a>
          : <button onClick={logout}>Logout</button>}
      </div>
      <Header />
      <Main />

    </div>
  );
}

export default App;

