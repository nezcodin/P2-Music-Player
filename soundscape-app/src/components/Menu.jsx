import { Link } from "react-router-dom"
import { Home } from "./Home"
import { Search } from "./Search"
import { Playlists } from "./Playlists"
import { MusicPlayer } from "./MusicPlayer"

export const Menu = () => {
  return (
    <div className="menu">
      <div className="menu-buttons">
        <Link className="top" to='/'>Home</Link>
        <Link className="side" to='/search'>Search</Link>
        <Link className="side" to='/playlists'>Playlists</Link>
        <Link className="top" to='/music-player'>Play Music</Link>
      </div>
      <div className="button-submit-container">
        <button className='button-submit' type='submit'></button>
      </div>
    </div>
  )
}