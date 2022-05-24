function spotifyAPI(type, name, token) {
  if (name == 'currentUserInfo') {
    let url = 'https://api.spotify.com/v1/me';
  }
  else if (name == 'currentUserPlaylist') {
    let url = 'https://api.spotify.com/v1/me/playlists';
  }
  else if (name == '') {
    let url = '';
  }
  else if (name == '') {
    let url = '';
  }
  else if (name == '') {
    let url = '';
  }
  else if (name == '') {
    let url = '';
  }
  else if (name == '') {
    let url = '';
  }
  else if (name == '') {
    let url = '';
  }
  else if (name == '') {
    let url = '';
  }
  
  const Http = new XMLHttpRequest();
  Http.open(type, url);

  Http.setRequestHeader("Accept", "application/json");
  Http.setRequestHeader("Content-Type", "application/json");
  Http.setRequestHeader("Authorization", "Bearer " + token);

  Http.send();

  Http.onreadystatechange=(e)=>{
    if (Http.readyState == XMLHttpRequest.DONE) {
      let json = JSON.parse(Http.responseText));
      return json;
    }
  }
}

function allPlaylistSongs(currentUserPlaylistJSON) {
  let total = 0;
  for (var i = 0; i < json.total; i++) {
    total += currentUserPlaylistJSON.items[i].tracks.total;
  }
  return total;
}

function spotifyLogin() {//implement state and PKCE parameters
  let url = "https://accounts.spotify.com/authorize";
  url += "?client_id=" + "0c2ae7c6bfa04d98b164f6e30559c13d";
  url += "&response_type=code";
  url += "&redirect_uri=" + encodeURI("http://andonli.com/spotifydupe.html");
  url += "&scope=" + "playlist-read-private playlist-modify-private";
  url += "&show_dialog=true";

  window.location.href = url;

}


function onPageLoad() {
  if (window.location.search.length > 0) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    let code = urlParams.get('code');
    fetchAccessToken(code);
  }
}

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

  Http.onreadystatechange=(e)=>{
    if (Http.readyState == XMLHttpRequest.DONE) {
      let json = JSON.parse(Http.responseText);
      let token = json.access_token;
      displayAccInfo(token);

    }
  }
}

function displayAccInfo(token) {

  let currentUserInfoJSON = spotifyAPI('GET', 'currentUser', token);
  let currentUserPlaylistJSON = spotifyAPI('GET', 'currentUserPlaylist', token);

  document.getElementById('accInfo').innerHTML = "Hello, " + currentUserInfoJSON.display_name + ". Your  " + currentUserPlaylistJSON.total + " playlist(s) contain " + allPlaylistSongs(currentUserPlaylistJSON) + " songs.";

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
          document.getElementById('p1').innerHTML = document.getElementById('p1').innerHTML.concat(json.items[i].name);
        }
      }
      else {
        document.getElementById('p1').innerHTML = 'An error was encountered.'
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
