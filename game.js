let gamePattern = [];
let userClickedPattern = [];
let buttonColors = ["red", "green", "blue", "yellow"];
//console.log(buttonColors);
let randomNumber;
let randomChosenColor;
let color;
let userColorChosen;
let audio = document.createElement("audio");
let level = 0;
var started = false;


function nextSequence() {
  userClickedPattern = [];
  level++;
  $("h1").text("Level " + level);
  randomNumber = Math.floor(Math.random() * 4);
  randomChosenColor = buttonColors[randomNumber];
  //console.log(randomNumber, randomChosenColor);
  gamePattern.push(randomChosenColor);
  //console.log(gamePattern);
  color = $("#" + randomChosenColor);
  $(color).fadeOut().fadeIn();
  playSound(randomChosenColor);
  animatePress(randomChosenColor);
}


document.addEventListener("keydown", function (e) {
  if (e.key == "A" && !started) {

    $("h1").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function () {
  userColorChosen = this.id;
  userClickedPattern.push(userColorChosen);
  $("#"+userColorChosen).fadeOut().fadeIn();
  console.log(userClickedPattern);
  playSound(userColorChosen);
  animatePress(userColorChosen);
  checkAnswer(userClickedPattern.length-1);

});

function playSound(name) {

  audio.src = `sounds/${name}.mp3`;
  audio.play();
  
}

function animatePress(currentColor) {
  let colorPressed = $("#" + currentColor)
  $(colorPressed).addClass("pressed");
  setTimeout(function () {
    $(colorPressed).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length){
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("h1").text("Game Over, Press A Key to Restart");

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
