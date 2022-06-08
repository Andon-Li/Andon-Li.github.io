const Http = new XMLHttpRequest();

function getUserName(token) {
  url = 'https://api.spotify.com/v1/me';
  Http.open('GET', url);
  Http.setRequestHeader("Accept", "application/json");
  Http.setRequestHeader("Content-Type", "application/json");
  Http.setRequestHeader("Authorization", "Bearer " + token);
  Http.send();
  Http.onload=(e)=>{
    let json = JSON.parse(Http.responseText);
    console.log(json.display_name);
    document.getElementById('userName').innerText += json.display_name + '.';
    document.getElementById('userName').innerText = json.display_name + '.';
  }
}

function getPlaylistInfo(token) {
  url = 'https://api.spotify.com/v1/me/playlists';
  Http.open('GET', url);
  Http.setRequestHeader("Accept", "application/json");
  Http.setRequestHeader("Content-Type", "application/json");
  Http.setRequestHeader("Authorization", "Bearer " + token);
  Http.send();
  Http.onload=(e)=>{
    let json = JSON.parse(Http.responseText);
    document.getElementById('playlistTotal').innerText = json.total;
    var songTotal = 0;
    for (var i = 0; i < json.total; i++) {
      if (true) {
        songTotal += json.items[i].tracks.total;
      }
    }
    document.getElementById('songTotal').innerText = songTotal;
  }
}


function allPlaylistSongs(currentUserPlaylistJSON) {
  let total = 0;
  for (var i = 0; i < json.total; i++) {
    total += currentUserPlaylistJSON.items[i].tracks.total;
  }
  return total;
}


//When "Log into Spotify" button is pressed, open new tab
function spotifyLogin() {
  let url = "https://accounts.spotify.com/authorize";
  url += "?client_id=" + "0c2ae7c6bfa04d98b164f6e30559c13d";
  url += "&response_type=code";
  url += "&redirect_uri=" + encodeURI("http://andonli.com/spotifydupe.html");
  url += "&scope=" + "playlist-read-private playlist-modify-private user-read-private";
  url += "&show_dialog=true";

  window.location.href = url;

}



//When the page loads, check for query code. If it exists, call fetchAccessToken() and pass the code through.
function onPageLoad() {
  if (window.location.search.length > 0) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    let code = urlParams.get('code');
    fetchAccessToken(code);
  }
}


//Using the code string, along with client id and client secret, send a request to Spotify
function fetchAccessToken(code) {
  let body = "grant_type=authorization_code";
  body += "&code=" + code;
  body += "&redirect_uri=" + encodeURI("http://andonli.com/spotifydupe.html");

  const Http = new XMLHttpRequest();
  const url="https://accounts.spotify.com/api/token";
  Http.open("POST", url);
  Http.setRequestHeader("Authorization", "Basic " + "MGMyYWU3YzZiZmEwNGQ5OGIxNjRmNmUzMDU1OWMxM2Q6NzJjOTQ4MDk3YTI1NDIzMjkzY2U2ZTFkNDlkOGUwNzA="); //bota("0c2ae7c6bfa04d98b164f6e30559c13d" + ":" + "72c948097a25423293ce6e1d49d8e070"
  Http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  Http.send(body);

  Http.onload=(e)=>{
    let json = JSON.parse(Http.responseText);
    let token = json.access_token;
    displayAccInfo(token);

  }
}

function displayAccInfo(token) {
  getUserName(token);
  getPlaylistInfo(token);
}

function getPlaylistList() {
  const spotifyAuth = document.getElementById('spotifyAuth').value
  //IMPLEMENT SPOTIFY AUTH WITH PXCE https://developer.spotify.com/documentation/general/guides/authorization/code-flow/
  //express framework ?? node.js???
  const Http = new XMLHttpRequest();
  const url='https://api.spotify.com/v1/me/playlists';
  Http.open("GET", url);
  Http.setRequestHeader("Authorization", "Bearer " + spotifyAuth);
  Http.send();

  Http.onreadystatechange=(e)=>{
    if (Http.readyState == XMLHttpRequest.DONE) {
      const json = JSON.parse(Http.responseText);
      if (!json.error) {
        for (var i = 0; i < json.total; i++) {
          document.getElementById('p1').innerText = document.getElementById('p1').innerText.concat(json.items[i].name);
        }
      }
      else {
        document.getElementById('p1').innerText = 'An error was encountered.'
      }
      console.log(json)
    }
  }
}

function findDupes() {
  // SEE OF YOU CAN READ LIKED SONGS PLAYLIST
  /*
  check number of  arguements for findDupes()
  if zero, pass in all playlists
  if one, pass that one playlist
  use hashset to check for duplicates !!!??????
  duplicates attributes: same arist, trackname, time signature, key

  present user with option to remove one or the other, or skip, or remove both





  */
}
