import axios from "axios"
import { useState, useEffect } from "react"

export const Search = () => {

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
  }, [])

  const [searchKey, setSearchKey] = useState("")
  const [artists, setArtists] = useState([])
  const [albums, setAlbums] = useState([])
  const [tracks, setTracks] = useState([])

  const searchFunction = async (e) => {
    e.preventDefault()

    const { data } = await axios.get("https://api.spotify.com/v1/search", {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: {
        q: searchKey,
        type: "artist,album,track"
      }
    })

    setArtists(data.artists.items)
    setAlbums(data.albums.items)
    setTracks(data.tracks.items)
    console.log(data)
  }

  const renderArtists = () => {
    return artists.map(artist => (
      <div className="artist-result" key={artist.id}>
        {
          artist.images.length ? <img src={artist.images[0].url} alt='artist' className='artist-photo' /> : <div>Image Unavailable</div>
        }
        <p className="artist-name">{artist.name}</p>
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

  const renderTracks = () => {
    return tracks.map((track) => (
      <div key={track.id}>
        <p>{track.name}</p>
        <p>{track.artists[0].name}</p>
      </div>
    ))
  }

  return (
    <div>

      <div className='search'>
        <form onSubmit={searchFunction}>
          <input type="text" onChange={e => setSearchKey(e.target.value)} className='search-bar' />
          <button type={"submit"} className='search-button'>Search</button>
        </form>

        {renderArtists()}
        {renderAlbums()}
        {renderTracks()}
      </div>

    </div>
  )
}