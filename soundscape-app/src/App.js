import './App.css';
import { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { Main } from './components/Main';

function App() {

  // const CLIENT_ID = '4b53edf8d3184c88ad99c1105531b262'
  // const REDIRECT_URI = "http://localhost:3000"
  // const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
  // const SCOPES = [
  //   'streaming',
  //   'user-read-email',
  //   'user-read-private',
  //   'user-library-read',
  //   'user-library-modify',
  //   'user-read-playback-state',
  //   'user-modify-playback-state',
  //   'playlist-modify-public',
  //   'playlist-modify-private'
  // ];
  // const RESPONSE_TYPE = "token"

  // const [token, setToken] = useState("")

  // useEffect(() => {
  //   //get access token from URL
  //   const hash = window.location.hash
  //   let token = window.localStorage.getItem("token")

  //   if (!token && hash) {
  //     token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]

  //     window.location.hash = ""
  //     window.localStorage.setItem("token", token)
  //   }

  //   setToken(token)
  //   console.log('Connected.')
  // }, [])



  // const logout = () => {
  //   //removes access token to log out
  //   setToken("")
  //   window.localStorage.removeItem("token")
  // }

  return (
    <div className="App">
      <Header />

      {/* <div className='spotify-auth'>

        {!token ?
          <div className='log-button'>
            <button className='login-button' onClick={() => {
              window.location.href = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${encodeURIComponent(SCOPES)}&response_type=${RESPONSE_TYPE}`;
            }}>Login to Spotify</button>
          </div>
          : <div className='log-button'> <button className='logout-button' onClick={logout}>Logout</button> </div>}
      </div> */}

      <Main />

    </div>
  );
}

export default App;

