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

    phonetic_list = []

    for (line of dictionary) {
      if (line.startsWith(word)) {
        phonetic_list.push(line.split('  ')[1].split(' '))
        break
      }
    }
  }
  getElementById('text_area').innerHTML = phonetic_list[0]
}

fetch('../cmudict-0.7b.txt')
  .then((response) => response.text())
  .then((text) => {
    const dictionary = text.split('\n');
    console.log("test!!!!!!!!!!!!!")
});
