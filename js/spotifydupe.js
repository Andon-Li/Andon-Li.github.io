function spotifyLogin() {//implement state and PKCE parameters
  var url = "https://accounts.spotify.com/authorize";
  url += "?client_id=" + "0c2ae7c6bfa04d98b164f6e30559c13d";
  url += "&response_type=code";
  url += "&redirect_uri=" + encodeURI("http://andonli.com/spotifydupe.html");
  url += "&scope=" + "playlist-read-private playlist-modify-private";
  url += "&show_dialog=true";

  window.location.href = url;

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
