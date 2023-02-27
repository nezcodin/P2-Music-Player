import { Home } from "./Home"
import { Search } from "./Search"
import { Playlists } from "./Playlists"
import { MusicPlayer } from "./MusicPlayer"

export const Menu = () => {
  return (
    <div className="menu">
      <div className="menu-buttons">
        <Home />
        <Search />
        <Playlists />
        <MusicPlayer />
      </div>
    </div>
  )
}