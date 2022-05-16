import React, { useEffect, useState } from 'react';
import Timer from './Timer';
import { Time } from '../utils/timeUtils'
const axios = require('axios').default;

interface Props {
  name: string;
  steamId: string;
  time: Time;
}

const UserStatus: React.FC<Props> = (props) => {
  const [game, setGame] = useState('');
  const [gameId, setGameId] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);

  const checkGameStatus = async () => {
    const gameStatus = await axios.get(`/api/profile/playersummary/${props.steamId}`)
    .then((response: any) => {
      console.log(response);
      if(response.data.hasOwnProperty('gameextrainfo')) {
        setGame(response.data?.gameextrainfo);
        setGameId(response.data?.gameid)
        setIsPlaying(true);
      } else {
        setGame('');
        setGameId('')
        setIsPlaying(false);
      }
      return response;
    })
    .catch((error: any) => {
      console.log(error);
      return error;
    });
    return gameStatus;
  }

  useEffect(() => {
    const intervalPoll = setInterval(checkGameStatus, 5000); // poll api at 5 sec intervals to detect game activity

    return () => {
      clearInterval(intervalPoll);
    }
  },[]);

  return (
    <>
    {isPlaying ?
      <div>
        <h3>{props.name} is currently not in a game</h3>
      </div>
      :
      <div>
        <Timer time={props.time} />
        <h3>currently playing</h3>
        <img
          src={`https://steamcdn-a.akamaihd.net/steam/apps/${gameId}/header.jpg`}
          alt={game}
        />
      </div>
    }
    </>
  )
    
};

export default UserStatus;