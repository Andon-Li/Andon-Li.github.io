function process_prompt() {
  prompt = document.getElementById('prompt_input').value.toUpperCase();
  prompt_array = prompt.split(' ');
  phonetic_list = []

  for (word of prompt_array) {
    switch (word.slice(-1)) {

      case '.':
        phonetic_list.push('PERIOD');
        word = word.slice(0, -1);
        console.log('a period has been found');
        break

      case ',':
        phonetic_list.push('COMMA');
        word = word.slice(0, -1);
        console.log('a comma has been found');
        break

      case '!':
        phonetic_list.push('EXCLAIM');
        word = word.slice(0, -1);
        console.log('a excalim has been found');
        break

      case '?':
        phonetic_list.push('QUESTION');
        word = word.slice(0, -1);
        console.log('a question has been found');
        break

      default:
        phonetic_list.push('NONE');
        console.log('no punctuation was found');
    }

    for (line of dictionary) {
      split = line.split('  ');
      if (split[0] == word) {
        phonetic_list[phonetic_list.length - 1].push(split[1].split(' '));
        break
      }
    }
  }
  document.getElementById('text_area').innerHTML = phonetic_list
}

var phonetic_list;
var dictionary;

fetch('../cmudict-0.7b.txt')
  .then((response) => response.text())
  .then((text) => {
    dictionary = text.split('\n');
});
