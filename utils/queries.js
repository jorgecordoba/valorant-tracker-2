import {composeDateQuery} from '../utils/utils'

const axios = require('axios');

export async function getMatch(match_id) {
  try {      
      const url = `http://despechis.com:4000/matches/${match_id}`      
      const response = await axios.get(url);      
      return response.data   
  }
  catch (error) {
      console.log("There is an error " + error)
  }
}

export async function getPreviousMatch(match_id) {
  try {      
      const url = `http://despechis.com:4000/matches/${match_id}/previous`      
      const response = await axios.get(url);      
      return response.data.match_id  
  }
  catch (error) {
      console.log("There is an error " + error)
  }
}

export async function getNextMatch(match_id) {
  try {      
      const url = `http://despechis.com:4000/matches/${match_id}/next`      
      const response = await axios.get(url);      
      return response.data.match_id  
  }
  catch (error) {
      console.log("There is an error " + error)
  }
}

export async function getPlayerMatchStats(match_id) {
  try {      
      const url = `http://despechis.com:4000/matches/${match_id}/stats`      
      const response = await axios.get(url);      
      return response.data  
  }
  catch (error) {
      console.log("There is an error " + error)
  }
}

export async function getMatches(from, to) {
    try {      
        const url = `http://despechis.com:4000/matches${composeDateQuery(from, to)}`  
        const response = await axios.get(url);      
        return response.data   
    }
    catch (error) {
        console.log("There is an error " + error)
    }
  }
  
export async function getAccountStats(from, to) {
    try {    
  
      let players = await axios.get(`http://despechis.com:4000/player${composeDateQuery(from, to)}`);
      let player_data = []
  
      for (const item of players.data) {
        let entry = await axios.get(`http://despechis.com:4000/account/${item.puuid}${composeDateQuery(from, to)}`)
        let stats = await axios.get(`http://despechis.com:4000/account/${item.puuid}/stats${composeDateQuery(from, to)}`)
        entry.data.stats = stats.data
        player_data.push(entry.data)
      }    
      return player_data
    }
    catch (error) {
      console.log("There's an error " + error)
    }
  }
  
export async function getPlayerStats(from, to) {
    try {
      let players = await axios.get(`http://despechis.com:4000/player${composeDateQuery(from, to)}`);
      let player_data = []
  
      let data = players.data
  
      data = data.filter((v,i,a)=>a.findIndex(t=>(t.name===v.name))===i)
  
      for (const item of data) {      
        let stats = await axios.get(`http://despechis.com:4000/player/${item.name}/stats${composeDateQuery(from, to)}`)      
        stats.data.name = item.name
        player_data.push(stats.data)
      }
      return player_data
    }
    catch (error) {
      console.log("There's an error " + error)
    }
  }
  
export async function getPerDayStats(from, to) {
    try {
      let perday = await axios.get(`http://despechis.com:4000/account/perday${composeDateQuery(from, to)}`);        
      
      return perday.data
    }
    catch (error) {
      console.log("There's an error " + error)
    }
  }