import { Routes, Route } from 'react-router-dom'
import { Home } from './Home'
import { NavBar } from './NavBar'
import { Search } from './Search'

export const Main = () => {
  return (
    <div>
      <h2>Main Component</h2>
      <NavBar />
      <Search />
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
    </div>
  )
}