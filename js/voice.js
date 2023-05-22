import {Howl, Howler} from './howler.core.js';

function process_prompt() {
  prompt = document.getElementById('prompt_input').value.toUpperCase();
  prompt_array = prompt.split(' ');
  phonetic_list = []

  for (word of prompt_array) {
    switch (word.slice(-1)) {

      case '.':
        punctuation = 'PERIOD';
        word = word.slice(0, -1);
        break

      case ',':
        punctuation = 'COMMA';
        word = word.slice(0, -1);
        break

      case '!':
        punctuation = 'EXCLAIM';
        word = word.slice(0, -1);
        break

      case '?':
        punctuation = 'QUESTION';
        word = word.slice(0, -1);
        break

      default:
        punctuation = 'NONE';
    }

    for (line of dictionary) {
      split = line.split('  ');
      if (split[0] == word) {
        phonetic_list.push(split[1].split(' '));
        phonetic_list[phonetic_list.length-1].unshift(punctuation)
        break
      }
    }
  }
}

var phonetic_list;
var dictionary;
var sound;
fetch('../cmudict-0.7b.txt')
  .then((response) => response.text())
  .then((text) => {
    dictionary = text.split('\n');
});
