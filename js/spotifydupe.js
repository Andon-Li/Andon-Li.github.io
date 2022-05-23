function spotifyLogin() {//implement state and PKCE parameters
  let url = "https://accounts.spotify.com/authorize";
  url += "?client_id=" + "0c2ae7c6bfa04d98b164f6e30559c13d";
  url += "&response_type=code";
  url += "&redirect_uri=" + encodeURI("http://andonli.com/spotifydupe.html");
  url += "&scope=" + "playlist-read-private playlist-modify-private";
  url += "&show_dialog=true";

  window.location.href = url;

}
// URL: http://andonli.com/spotifydupe.html?code=AQAGTBzz8bHRTSlfx940K0sPCUvBy-O8cAjKJ-1E-QL27J6PeHpITXtFUuKcOMqP5wReoau87rDphNEWQIzzp-gJtwGXaW0FBQvX6Cco75K1q1TD8UptsRHY66UaJsK-BOI2ZJFgxfRvGXNfDJ2m1wN8QNB48NA_VHQG9Mkr8X-gJUmP9dhOIy_6GVR5cHDh6AMqSLgtsMsIzD2g3ohSGfNC6Zd3HqI5nQjAfDq1W-oejpUKKgUu

function onPageLoad() {//when the page loads, if a query string exists, pull the query string section of the URL, and parse out the 'code'
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
      console.log(Http.responseText);
      let json = JSON.parse(Http.responseText);
      let token = json.access_token;
      displayAccInfo(token);

    }
  }
}

function displayAccInfo(token) {

  const Http = new XMLHttpRequest();
  const url="https://api.spotify.com/v1/me/playlists?limit=50&offset=0";
  Http.open("POST", url);
  Http.setRequestHeader("Authorization", "Bearer " + token);
  Http.setRequestHeader("Content-Type", "application/json");
  Http.send();

  Http.onreadystatechange=(e)=>{
    console.log(Http.responseText);
  }
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
