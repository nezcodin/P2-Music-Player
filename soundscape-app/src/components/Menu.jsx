import { Link } from "react-router-dom"
import { Home } from "./Home"
import { Search } from "./Search"
import { Playlists } from "./Playlists"
import { MusicPlayer } from "./MusicPlayer"

export const Menu = () => {
  return (
    <div className="menu">
      <div className="menu-buttons">
        <Link to='/'>Home</Link>
        <Link to='/search'>Search</Link>
        <Link to='/playlists'>Playlists</Link>
        <Link to='/music-player'>Play Music</Link>
      </div>
    </div>
  )
}