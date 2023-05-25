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

async function pronounce() {
  var sound = new Howl({
    src: ['../assets/soundfile1.mp3'],
    sprite: {
      AA0: [0,1000],
      AA1: [0,1000],
      AA2: [0,1000],
      AE0: [1000, 1000],
      AE1: [1000, 1000],
      AE2: [1000, 1000],
      AH0: [2000, 1000],
      AH1: [2000, 1000],
      AH2: [2000, 1000],
      AO0: [3000, 1000],
      AO1: [3000, 1000],
      AO2: [3000, 1000],
      AW0: [4000, 1000],
      AW1: [4000, 1000],
      AW2: [4000, 1000],
      AY0: [5000, 1000],
      AY1: [5000, 1000],
      AY2: [5000, 1000],
      B:  [6000, 1000],
      CH: [7000, 1000],
      D:  [8000, 1000],
      DH: [9000, 1000],
      EH0: [10000, 1000],
      EH1: [10000, 1000],
      EH2: [10000, 1000],
      ER0: [11000, 1000],
      ER1: [11000, 1000],
      ER2: [11000, 1000],
      EY0: [12000, 1000],
      EY1: [12000, 1000],
      EY2: [12000, 1000],
      F:  [13000, 1000],
      G:  [14000, 1000],
      HH: [15000, 1000],
      IH0: [16000, 1000],
      IH1: [16000, 1000],
      IH2: [16000, 1000],
      IY0: [17000, 1000],
      IY1: [17000, 1000],
      IY2: [17000, 1000],
      JH: [18000, 1000],
      K:  [19000, 1000],
      L:  [20000, 1000],
      M:  [21000, 1000],
      N:  [22000, 1000],
      NG: [23000, 1000],
      OW0: [24000, 1000],
      OW1: [24000, 1000],
      OW2: [24000, 1000],
      OY0: [25000, 1000],
      OY1: [25000, 1000],
      OY2: [25000, 1000],
      P:  [26000, 1000],
      R:  [27000, 1000],
      S:  [28000, 1000],
      SH: [29000, 1000],
      T:  [30000, 1000],
      TH: [31000, 1000],
      UH0: [32000, 1000],
      UH1: [32000, 1000],
      UH2: [32000, 1000],
      UW0: [33000, 1000],
      UW1: [33000, 1000],
      UW2: [33000, 1000],
      V:  [34000, 1000],
      W:  [35000, 1000],
      Y:  [36000, 1000],
      Z:  [37000, 1000],
      ZH: [38000, 1000],
      __default: [0, 38000]
    }
  });

  for (word of phonetic_list) {
    for (let i = 1; i < word.length; i++) {
      sound.play(word[i]);
      await sleep(500);
    }
  }
}

const sleep = m => new Promise(r => setTimeout(r, m))
var phonetic_list;
var dictionary;
var sound;
fetch('../cmudict-0.7b.txt')
  .then((response) => response.text())
  .then((text) => {
    dictionary = text.split('\n');
});

var sound = new Howl({
  src: ['../assets/phonetics.mp3'],
  sprite: {
    blast: [0, 3000],
    laser: [4000, 1000],
    winner: [6000, 5000],
    __default: [0, 1000]
  }
});

// Shoot the laser!
sound.play('laser');
