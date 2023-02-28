import { useState, useEffect } from "react"
import axios from "axios"

export const Playlists = () => {

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

  const handlePlaylistAddSong = async (e) => {
    e.preventDefault()

    const { data } = await axios.get("https://api.spotify.com/v1/me/playlists", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    console.log(data)
  }

  return (
    <div className="playlists">
      <p>Playlists</p>
      <button onClick={handlePlaylistAddSong}>see playlists</button>
    </div>
  )
}