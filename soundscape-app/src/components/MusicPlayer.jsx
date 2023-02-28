import { useEffect, useState } from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';

export const MusicPlayer = () => {
  const [token, setToken] = useState("");

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");

    if (!token && hash) {
      token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1];

      window.location.hash = "";
      window.localStorage.setItem("token", token);
    }

    setToken(token);
  }, []);

  useEffect(() => {
    let player;

    const handlePlayer = async () => {
      player = new window.Spotify.Player({
        name: 'Web Playback SDK Quick Start Player',
        getOAuthToken: cb => {
          cb(token);
        },
        volume: 0.5,
        webPlaybackSDKOptions: {
          name: 'web-playback-sdk',
          getOAuthToken: cb => { cb(token); },
          // Specify the robustness level here
          getDeviceId: async () => {
            const { devices } = await window.Spotify.getMyDevices();
            return devices.find(device => device.type === 'Computer').id;
          },
          getError: err => console.error(err),
          volume: 0.5,
          // Set the robustness level here
          playerInit: {
            name: "Spotify Web Playback SDK",
            getOAuthToken: cb => { cb(token); },
            volume: 0.5,
            // Set the robustness level here
            attributes: {
              'restrictions': {
                'disallow_pausing': false,
                'disallow_skipping_prev': false,
                'disallow_skipping_next': false,
                'disallow_seek': false
              }
            }
          }
        }
      });

      // Ready
      player.addListener('ready', ({ device_id }) => {
        console.log('Ready with Device ID', device_id);
      });

      // Not Ready
      player.addListener('not_ready', ({ device_id }) => {
        console.log('Device ID has gone offline', device_id);
      });

      player.addListener('initialization_error', ({ message }) => {
        console.error(message);
      });

      player.addListener('authentication_error', ({ message }) => {
        console.error(message);
      });

      player.addListener('account_error', ({ message }) => {
        console.error(message);
      });

      player.connect();
    };

    if (window.Spotify) {
      handlePlayer();
    } else {
      window.onSpotifyWebPlaybackSDKReady = handlePlayer;
    }

    return () => {
      if (player) {
        player.disconnect();
      }
    }
  }, [token]);

  return (
    <div className="music-player">
      <p>Music Player</p>
      <button id="togglePlay" onClick={() => window.player?.togglePlay()}>Toggle Play</button>
      <SpotifyPlayer token={token} />
    </div>
  );
};





// import { useEffect, useState } from 'react';
// import SpotifyPlayer from 'react-spotify-web-playback';

// export const MusicPlayer = () => {

//   const [token, setToken] = useState("")

//   useEffect(() => {
//     const hash = window.location.hash
//     let token = window.localStorage.getItem("token")

//     if (!token && hash) {
//       token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]

//       window.location.hash = ""
//       window.localStorage.setItem("token", token)
//     }

//     setToken(token)
//   }, [])

//   const MyPlayer = () => {

//     useEffect(() => {
//       window.onSpotifyWebPlaybackSDKReady = () => {
//         const player = new Spotify.Player({
//           name: 'Web Playback SDK Quick Start Player',
//           getOAuthToken: cb => {
//             cb(token);
//           },
//           volume: 0.5
//         });

//         // Ready
//         player.addListener('ready', ({ device_id }) => {
//           console.log('Ready with Device ID', device_id);
//         });

//         // Not Ready
//         player.addListener('not_ready', ({ device_id }) => {
//           console.log('Device ID has gone offline', device_id);
//         });

//         player.addListener('initialization_error', ({ message }) => {
//           console.error(message);
//         });

//         player.addListener('authentication_error', ({ message }) => {
//           console.error(message);
//         });

//         player.addListener('account_error', ({ message }) => {
//           console.error(message);
//         });

//         player.connect();
//       };
//     }, [token]);

//     return (
//       <div className="music-player">
//         <p>Music Player</p>
//         <button id="togglePlay" onClick={() => player?.togglePlay()}>Toggle Play</button>
//         <SpotifyPlayer token={token} />
//       </div>
//     )
//   }
// }
