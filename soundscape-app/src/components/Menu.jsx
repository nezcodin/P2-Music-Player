import { Link } from "react-router-dom";
import { Icon } from '@iconify/react';
import { useState } from 'react';

export const Menu = () => {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleMouseEnter = () => {
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  return (
    <div className="menu">

      <div className="menu-buttons">
        <Link
          className="home-icon"
          to='/'
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Icon icon="ic:sharp-home" className="home-icon" />
          {showTooltip && (
            <div className="tooltip-container">
              <span className="tooltip">
                <Link to='/' className="home-link">Home</Link>
                <Link to='/search' className="search-link">Search</Link>
                <Link to='/playlists' className="playlists-link">Playlists</Link>
                <Link to='/music-player' className="player-link">Play Music</Link>
              </span>
            </div>
          )}
        </Link>
        <Icon icon="ant-design:fast-forward-outlined" className="forward-icon" />
        <Icon icon="ant-design:fast-backward-outlined" className="backward-icon" />
        <p className="volume-icon">VOL</p>
      </div>
      <div className="button-submit-container">
        <button className='button-submit' type='submit'></button>
      </div>
    </div>
  )
}
