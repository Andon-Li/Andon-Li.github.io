function process_prompt() {
  prompt = document.getElementById('prompt_input').value.toUpperCase();
  prompt_array = prompt.split(' ');
  phonetic_list = []

  for (word of prompt_array) {
    switch (word.slice(-1)) {
      case '.':
        punctuation = 'PERIOD';
        word = word.slice(0, -1);
      case ',':
        punctuation = 'COMMA';
        word = word.slice(0, -1);
      case '!':
        punctuation = 'EXCLAIM';
        word = word.slice(0, -1);
      case '?':
        punctuation = 'QUESTION';
        word = word.slice(0, -1);
      default:
        punctuation = 'NONE';
    }
    console.log(prompt_array);
    console.log(punctuation);
    console.log(word);

    for (line of dictionary) {
      split = line.split('  ');
      if (split[0] == word) {
        phonetic_list.push(split[1].split(' '));
        if (punctuation) {
          phonetic_list[phonetic_list.length - 1].push(punctuation);
        }
        break
      }
    }
  }
  document.getElementById('text_area').innerHTML = phonetic_list
}
var phonetic_list = []
var dictionary;
fetch('../cmudict-0.7b.txt')
  .then((response) => response.text())
  .then((text) => {
    dictionary = text.split('\n');
});
