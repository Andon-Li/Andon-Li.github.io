function process_prompt() {
  prompt = document.getElementById('prompt_input').value.toUpperCase();
  prompt_array = prompt.split(' ');
  console.log(prompt_array);
}
fetch('../cmudict-0.7b.txt')
  .then(function(response){
    console.log(response.value)
  })
