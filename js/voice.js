function process_prompt() {
  prompt = document.getElementById('prompt_input').value.toUpperCase();
  prompt_array = prompt.split(' ');

  for (word of prompt_array) {
    switch (word.slice(-1)) {
      case '.':
        punctuation = 'PERIOD';
      case ',':
        punctuation = 'COMMA';
      case '!':
        punctuation = 'EXCLAIM';
      case '?':
        punctuation = 'QUESTION';
      default:
        punctuation = null;
    }

    for (line of dictionary) {
      if (line.startsWith(word)) {
        phonetic_list.push(line.split('  ')[1].split(' '));
        if (punctuation) {
          phonetic_list[phonetic_list.length-1].push(punctuation)
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
