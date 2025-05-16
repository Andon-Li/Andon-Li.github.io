from sys import argv
from base64 import b64encode
import requests
import json
import os
import yaml


if __name__ == '__main__':
    CLIENT_ID = '7fdc12a4a1ed41ca9ea85ad4fc20c43a'
    CLIENT_SECRET = '0295d0917b5f494cb8b668e4fc352dcc'
    encoded_client = b64encode(bytes(f'{CLIENT_ID}:{CLIENT_SECRET}', encoding='utf-8')).decode()

    access_token = requests.post('https://accounts.spotify.com/api/token', data={'grant_type': 'client_credentials'}, 
                                headers={'Authorization': f'Basic {encoded_client}'}).json()['access_token']

    api_data = requests.get(f'https://api.spotify.com/v1/shows/2X40qLyoj1wQ2qE5FVpA7x/episodes?limit=5&offset=0', headers={'Authorization': f'Bearer {access_token}'}).json()

    with open('./_data/distractible/episodes.yaml', 'r+') as ep_file, open('./_data/distractible/show.yaml', 'r+') as show_file:
        local_ep_data = yaml.safe_load(ep_file)
        local_show_data = yaml.safe_load(show_file)

        local_ep_num = local_show_data['episodeCount']
        local_latest_ep_spotify_id = local_ep_data[local_ep_num]['spotifyID']

        latest_ep_found = False
        for episode in reversed(api_data['items']):
            print('hello')
            if episode['id'] == local_latest_ep_spotify_id:
                latest_ep_found = True
                break
            # if latest_ep_found == False:
            #     break
            local_ep_num += 1
            hours, minutes = divmod(episode['duration_ms']/60_000, 60)
            
            episode_data = {local_ep_num: {
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
                    'day': episode['release_date'][8:10],
                    'month': episode['release_date'][5:7], 
                    'year': episode['release_date'][0:4]
                    },
                'spotifyID': episode['id'],
                'favorite_bit': None
            }}


