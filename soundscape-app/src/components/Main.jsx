import { Routes, Route } from 'react-router-dom'
import { Home } from './Home'
import { Menu } from './Menu'
import { Search } from './Search'
import { Playlists } from './Playlists'
import { MusicPlayer } from './MusicPlayer'

export const Main = () => {
  return (
    <div>
      <h2>Main Component</h2>
      <Menu />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/search' element={<Search />} />
        <Route path='/playlists' element={<Playlists />} />
        <Route path='/music-player' element={<MusicPlayer />} />
      </Routes>
    </div>
  )
}