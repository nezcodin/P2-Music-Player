import { useState, useEffect } from "react"
import axios from "axios"

export const Playlists = () => {

  const [token, setToken] = useState("")
  const [playlistId, setPlaylistId] = useState(null)

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

  const handleCreatePlaylist = async () => {
    const playlistName = "My Awesome Playlist";
    const { data: user } = await axios.get("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const { data: playlist } = await axios.post(
      `https://api.spotify.com/v1/users/me/playlists`,
      {
        name: playlistName
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    const trackUris = ["spotify:track:7vGuf3Y35N4wmASOKLUVVU", "spotify:track:6f7o9j9EW1TAUv8IHicR3j"];
    await axios.post(
      `https://api.spotify.com/v1/playlists/${playlist.id}/tracks`,
      {
        uris: trackUris
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    console.log("Playlist created and tracks added!");
  };

  const seePlaylists = async (e) => {
    e.preventDefault()

    const { data } = await axios.get("https://api.spotify.com/v1/me/playlists", {
      headers: {
        Authorization: `Bearer ${token}`
      },
    }
    )
    console.log(data)
  }

  const handleAddTracks = async (e) => {
    e.preventDefault()

    try {
      await axios.post(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
        uris: ["spotify:track:7q9OcOvFz32lp2ycR5ZwO6", "spotify:track:1W8CkmIcxRJIEIWklvIpVp"]
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="playlists">
      <p>Playlists</p>
      {playlistId ?
        <button onClick={handleAddTracks}>Add tracks to playlist</button>
        :
        <button onClick={handleCreatePlaylist}>Create playlist</button>
      }
      <button onClick={seePlaylists}>See Playlists</button>
    </div>
  )
}
