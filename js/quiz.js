window.onSpotifyWebPlaybackSDKReady = () => {
    const token = 'BQBuyT7Pan6Y_auFt1byJMjTB6Q5cXWI-vnkr5XiGepuJQVsgKlS3jS1_LMHG_mdOzYwB_kMQvUwxqG4X6Ny93VNo7Kpt1A8Cm_dKCPzlARoTkzzR3__adFF-8pBhJxD8zYtyjbecCtYq2MPySNjeqsvW95-n4Kmgg-l7HpMT6l4O2Dp3qqi98ji1xe-ptzJh7WxziI2c-c-y2i7SLPnBgl60eoBLA';
    const player = new Spotify.Player({
        name: 'Web Playback SDK Quick Start Player',
        getOAuthToken: cb => { cb(token); },
        volume: 0.5
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

    document.getElementById('togglePlay').onclick = function() {
      player.togglePlay();
    };

    player.connect();
}
