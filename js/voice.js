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

function pronounce() {
  var sound = new Howl({
    src: ['../assets/phonetics.mp3'],
    sprite: {
      AA: [0,1000],
      AE: [1000,1000],
      AH: [2000,1000],
      AO: [3000,1000],
      AW: [4000,1000],
      AY: [5000,1000],
      B:  [6000,1000],
      CH: [7000,1000],
      D:  [8000,1000],
      DH: [9000,1000],
      EH: [10000,1000],
      ER: [11000,1000],
      EY: [12000,1000],
      F:  [13000,1000],
      G:  [14000,1000],
      HH: [15000,1000],
      IH: [16000,1000],
      IY: [17000,1000],
      JH: [18000,1000],
      K:  [19000,1000],
      L:  [20000,1000],
      M:  [21000,1000],
      N:  [22000,1000],
      NG: [23000,1000],
      OW: [24000,1000],
      OY: [25000,1000],
      P:  [26000,1000],
      R:  [27000,1000],
      S:  [28000,1000],
      SH: [29000,1000],
      T:  [30000,1000],
      TH: [31000,1000],
      UH: [32000,1000],
      UW: [33000,1000],
      V:  [34000,1000],
      W:  [35000,1000],
      Y:  [36000,1000],
      Z:  [37000,1000],
      ZH: [38000,1000],
      __default: [0, 1000]
    }
  });

  for (word of phonetic_list) {
    for (let i = 1; i < word.length; i++) {
      sound.play(word[i]);
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
