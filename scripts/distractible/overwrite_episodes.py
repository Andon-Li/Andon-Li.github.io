from sys import argv
from base64 import b64encode
import requests
import json
import yaml


if __name__ == '__main__':
    CLIENT_ID = argv[1]
    CLIENT_SECRET = argv[2]
    encoded_client = b64encode(bytes(f'{CLIENT_ID}:{CLIENT_SECRET}', encoding='utf-8')).decode()

    access_token = requests.post('https://accounts.spotify.com/api/token', data={'grant_type': 'client_credentials'}, 
                                headers={'Authorization': f'Basic {encoded_client}'}).json()['access_token']
    
    show_data = requests.get(f'https://api.spotify.com/v1/shows/2X40qLyoj1wQ2qE5FVpA7x', headers={'Authorization': f'Bearer {access_token}'}).json()
    total_episodes = show_data['total_episodes']

    all_episode_data = {}
    for offset in range(total_episodes-10, -10, -10):  # pull episodes in chronological order in groups of 10
        if offset < 0: 
            offset = 0
        api_data = requests.get(f'https://api.spotify.com/v1/shows/2X40qLyoj1wQ2qE5FVpA7x/episodes?limit=10&offset={offset}', headers={'Authorization': f'Bearer {access_token}'}).json()
        if api_data.get('error', False):
            continue

        for idx, episode in reversed(list(enumerate(api_data['items']))):
            episode_num = total_episodes - (offset + idx)  # number episodes in chronological order
            hours, minutes = divmod(episode['duration_ms']/60_000, 60)
            
            all_episode_data.update(
                {episode_num: {
                'title': episode['name'],
                'description': episode['description'],
                'host': [None],
                'points': {'bob': None, 'mark': None, 'wade': None},
                'winner': [None],
                'length': {
                    'hours': int(hours),
                    'minutes': int(minutes)
                },
                'published': {
                    'day': int(episode['release_date'][8:10]),
                    'month': int(episode['release_date'][5:7]), 
                    'year': int(episode['release_date'][0:4])
                    },
                'spotifyID': episode['id'],
                'favorite_bit': None
                }}
            )
        
    with open('./_data/distractible/episodes.yaml', 'w') as ep_file:
        yaml.safe_dump(all_episode_data, ep_file)
