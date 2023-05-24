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
    src: ['phonetic_audio.mp3'],
    sprite: {
      AA: [0,2000],
      AE: [2000,2000],
      AH: [4000,2000],
      AO: [6000,2000],
      AW: [8000,2000],
      AY: [10000,2000],
      B:  [12000,2000],
      CH: [14000,2000],
      D:  [16000,2000],
      DH: [18000,2000],
      EH: [20000,2000],
      ER: [22000,2000],
      EY: [24000,2000],
      F:  [26000,2000],
      G:  [28000,2000],
      HH: [30000,2000],
      IH: [32000,2000],
      IY: [34000,2000],
      JH: [36000,2000],
      K:  [38000,2000],
      L:  [40000,2000],
      M:  [42000,2000],
      N:  [44000,2000],
      NG: [46000,2000],
      OW: [48000,2000],
      OY: [50000,2000],
      P:  [52000,2000],
      R:  [54000,2000],
      S:  [56000,2000],
      SH: [58000,2000],
      T:  [60000,2000],
      TH: [62000,2000],
      UH: [64000,2000],
      UW: [66000,2000],
      V:  [68000,2000],
      W:  [70000,2000],
      Y:  [72000,2000],
      Z:  [74000,2000],
      ZH: [76000,2000]}
  })
  for (word in phonetic_list) {
    for (let i = 1; i < word.length; i++) {
      if (word[i].length > 2) {
        word[i] = word[i].slice(0,2)
      }
      sound.play(word[i])

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

var sound = new Howl({
  src: ['test.mp3']
});
sound.play()
