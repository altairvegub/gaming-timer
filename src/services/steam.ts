const axios = require('axios').default;
const STEAM_API_KEY = process.env.STEAM_API_KEY_APP;
const STEAM_BASE_URL = `http://api.steampowered.com/ISteamUser/`;
const PLAYER_SUMMARIES_API = `${STEAM_BASE_URL}GetPlayerSummaries/v0002/?key=${STEAM_API_KEY}&steamids=`;
const RESOLVE_VANITY_API = `${STEAM_BASE_URL}ResolveVanityURL/v0001/?key=${STEAM_API_KEY}&vanityurl=`;

export const resolveVanityURL = async (profileId: string): Promise<any> => {
  const response = axios.get(RESOLVE_VANITY_API + profileId
  )
  .then((response: any) => {
    return response
  })
  .catch((error: any) => {
    return error;
  })
  return response;
};

export const getPlayerSummary = async (steamid: string): Promise<string> => {
  if(steamid) {
    const userStatus = await axios.get(PLAYER_SUMMARIES_API + steamid)
    .then((response: any) => {
      return response.data.response.players[0];
    })
    .catch((error: any) => {
      console.log(error);
    });
    return userStatus;
  } else {
    console.log("not a valid id")
    return '';
  }
}

export const getProfile = async (vanityName: string) => {
  const steamid = await resolveVanityURL(vanityName)
  .then((response: any) => {
    return response.data.response.steamid;
  })
  .catch((error: any) => {
    console.log(error);
    return error;
  })

  if(steamid == undefined) {
    return await getPlayerSummary(vanityName)
  } else if (steamid){
    return await getPlayerSummary(steamid);
  } else {
    console.log('invalid vanity name or steam id entered');
    return JSON.stringify({});
  }
}
