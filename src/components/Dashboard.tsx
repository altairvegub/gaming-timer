import Profile from './Profile';
import React, {useState, useEffect, KeyboardEvent } from 'react';
import UserStatus from './UserStatus';
import Header from './Header';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import TimeManager from './TimeManager'
import '../App.css'
import { Time } from '../utils/timeUtils'
const axios = require('axios').default;
 
const Dashboard: React.FC = () => {
  const defTime = {
    hours: 0,
    minutes: 0,
    seconds: 0
  }

  const [vanityName, setVanityName] = useState<string>("");
  const [userName, setUserName] = useState("");
  const [profilePicUrl, setProfilePicUrl] = useState("");
  const [loginStatus, setLoginStatus] = useState(false);
  const [steamId, setSteamId] = useState("");
  const [time, setTime] = useState(defTime);
  const [haveTime, setHaveTime] = useState(false);

  const getProfile = async (vanityName: string) => {
    const response = await axios(`/api/profile/playersummary/${vanityName}`)
    .then(function(response: Response){
      return response;
    })
    .catch(function (error: Error) {
      console.log(error);
    })

    const profile = response.data;
    console.log(profile);

    if (response.data) {
      setSteamId(profile.steamid);
      setUserName(profile.personaname);
      setProfilePicUrl(profile.avatarfull);
      setLoginStatus(true);
    } else {
      console.log('no data found');
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      getProfile(vanityName);
    }
  }

  const toggleInputForm = () => {
    setLoginStatus(!loginStatus);
  }

  useEffect(() => {
    if(time !== defTime){
      setHaveTime(true);
    } else {
      setHaveTime(false);
    }
  },[time])

  return (
    <div className="App">
      <Header />
      {!loginStatus ?
      <div>
        <h3>Find your Steam account</h3>
        <form onSubmit={e => {
          e.preventDefault();
        }}>
          <TextField 
            name="vanityName" 
            type="text" value={vanityName} 
            placeholder="Vanity Name/steamID64" 
            onChange={e => setVanityName(e.target.value)} 
            id="outlined-basic" 
            variant="outlined"
            onKeyDown={handleKeyDown}
          />
        </form>
        (e.g. enter <b>gaben</b> if your profile is: www.steamcommunity.com/id/gaben or the <b>number</b> after /profile/ )
      </div> 
      : 
      <>
        <Button variant="outlined" onClick={toggleInputForm}>Search Profile</Button>
        <Profile name={userName} imgUrl={profilePicUrl} />
        {!haveTime ?
        <>
          <TimeManager getTime={(time: Time) => setTime(time)}/>
        </> :
        <>
          <Button variant="outlined" onClick={() => setHaveTime(false)}>New Time</Button>
          <UserStatus name={userName} steamId={steamId} time={time}/>
        </>
        }
      </>
      }
    </div>
  );
};

export default Dashboard;