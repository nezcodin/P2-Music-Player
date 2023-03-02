import { Link } from "react-router-dom"

export const Menu = () => {
  return (
    <div className="menu">

      <div className="menu-buttons">
        <Link className="home-icon" to='/'>Home</Link>
        <Link className="inside-home-icon" to='/search'>Search</Link>
        <Link className="inside-home-icon" to='/playlists'>Playlists</Link>
        <Link className="inside-home-icon" to='/music-player'>Play Music</Link>
      </div>
      <div className="button-submit-container">
        <button className='button-submit' type='submit'></button>
      </div>
    </div>
  )
}