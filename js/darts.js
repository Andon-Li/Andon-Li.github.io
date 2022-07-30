/*
when buttons are clicked, replace the image with one that highlights the
relevant section of the dartboard.
*/
function recolor(id) {
  const element = document.getElementById(id);

  outerBull.style.backgroundColor = "#b1faaf";
  innerBull.style.backgroundColor = "#faafaf";
  oneMulti.style.backgroundColor = "#aff2fa";
  twoMulti.style.backgroundColor = "#aff2fa";
  threeMulti.style.backgroundColor = "#aff2fa";

  const buttons = document.getElementsByTagName("button");
  for (button of buttons) {
    button.style.color = "black";
  }
  if (id == "outerBull") {
    element.style.backgroundColor = "#0c9908";
    scoreTotal.innerText = "25"
    element.style.color = "white";
    pic.src = "./assets/dartboard/outerBull.png";
  }
  else if (id == "innerBull") {
    element.style.backgroundColor = "#bd0404";
    scoreTotal.innerText = "50"
    element.style.color = "white";
    pic.src = "./assets/dartboard/innerBull.png";
  }
  else if (id == "oneMulti") {
    element.style.backgroundColor = "#02cbe3";
    multiplier = 1;
    math();
    pic.src = "./assets/dartboard/1multi.png";
  }
  else if (id == "twoMulti") {
    element.style.backgroundColor = "#02cbe3";
    multiplier = 2;
    math();
    pic.src = "./assets/dartboard/2Multi.png";
  }
  else if (id == "threeMulti") {
    element.style.backgroundColor = "#02cbe3";
    multiplier = 3;
    math();
    pic.src = "./assets/dartboard/3Multi.png";
  }
}

function math() {
  var base = pointInput.value;
  var total = (multiplier * base).toString();
  scoreTotal.innerText = total;
}

function confirm() {

}

function valid() {
  pointInput.style.color = "black";
  scoreTotal.style.color = "black";
  confirm.style.color = "black";
}

function invalid() {
  pointInput.style.color = "red";
  scoreTotal.style.color = "red";
  confirm.style.color = "red";
}

function onload() {
  window.multiplier = 1;
  window.teamOne = document.getElementsByClassName("teamOne")[0];
  window.teamTwo = document.getElementsByClassName("teamTwo")[0];
  window.outerBull = document.getElementById("outerBull");
  window.innerBull = document.getElementById("innerBull");
  window.oneMulti = document.getElementById("oneMulti");
  window.twoMulti = document.getElementById("twoMulti");
  window.threeMulti = document.getElementById("threeMulti");
  window.pointInput = document.getElementById("pointInput");
  window.scoreTotal = document.getElementById("scoreTotal");
  window.confirm = document.getElementById("confirm");
  window.pic = document.getElementById("pic");

  math();

  pointInput.addEventListener("input", () => {
    if (pointInput.value === "") {
      scoreTotal.innerText = "0";
    }
    if (pointInput.value > 0 && pointInput.value < 21 && pointInput.value != "") {
      valid();
      math();
    }
    else {
      invalid();
    }
  })

  teamOne.addEventListener("click", () => {
    teamOne.style.backgroundColor = "#02cbe3";
    teamTwo.style.backgroundColor = "#aff2fa";
  })

  teamTwo.addEventListener("click", () => {
    teamOne.style.backgroundColor = "#aff2fa";
    teamTwo.style.backgroundColor = "#02cbe3";
  })

  confirm.addEventListener("click", () => {
    confirm();
  })
}

window.addEventListener('load', onload);
