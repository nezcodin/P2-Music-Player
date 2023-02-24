import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios'
import { Header } from './components/Header';
import { Main } from './components/Main';

//Resources:
//  Getting started with using OAuth for Spotify: https://dev.to/dom_the_dev/how-to-use-the-spotify-api-in-your-react-js-app-50pn


function App() {

  const CLIENT_ID = '4b53edf8d3184c88ad99c1105531b262'
  const REDIRECT_URI = "http://localhost:3000"
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
  const RESPONSE_TYPE = "token"

  const [token, setToken] = useState("")

  useEffect(() => {
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
    setToken("")
    window.localStorage.removeItem("token")
  }

  const [searchKey, setSearchKey] = useState("")
  const [artists, setArtists] = useState([])
  const [albums, setAlbums] = useState([])

  const searchFunction = async (e) => {
    e.preventDefault()

    const { data } = await axios.get("https://api.spotify.com/v1/search", {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: {
        q: searchKey,
        type: "artist,album"
      }
    })

    setArtists(data.artists.items)
    setAlbums(data.albums.items)
    console.log(data)
  }

  const renderArtists = () => {
    return artists.map(artist => (
      <div key={artist.id}>
        <p>{artist.name}</p>
        {
          artist.images.length ? <img src={artist.images[0].url} alt='artist' className='artist-photo' /> : <div>Image Unavailable</div>
        }
      </div>
    ))
  }

  const renderAlbums = () => {
    return albums.map((album) => (
      <div key={album.id}>
        <p>{album.name}</p>
        {
          album.images.length ? <img src={album.images[0].url} alt='album' className='album-photo' /> : <div>Album Image Unavailable</div>
        }
      </div>
    ))
  }




  return (
    <div className="App">

      <h1>Spotify React App</h1>

      <div className='spotify-auth'>
        {!token ?
          <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login
            to Spotify</a>
          : <button onClick={logout}>Logout</button>}
      </div>

      <Header />
      <Main />

      <div className='placeholder-artist-search'>
        <form onSubmit={searchFunction}>
          <input type="text" onChange={e => setSearchKey(e.target.value)} />
          <button type={"submit"}>Search</button>
        </form>

        {renderArtists()}
        {renderAlbums()}
      </div>

    </div>
  );
}

export default App;
