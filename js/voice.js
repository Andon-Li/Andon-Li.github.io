function process_prompt() {
  prompt = document.getElementById('prompt_input').value.toUpperCase();
  prompt_array = prompt.split(' ');

  for (const word of prompt_array) {
    switch (word.slice(-1)) {
      case '.':
        punctuation = 'PERIOD'
      case ',':
        punctuation = 'COMMA'
      case '!':
        punctuation = 'EXCLAIM'
      case '?':
        punctuation = 'QUESTION'
      default:
        punctuation = null
    }

  }
}
fetch('../cmudict-0.7b.txt')
  .then((value) => console.log(value))
