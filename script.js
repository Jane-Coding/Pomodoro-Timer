const duration = document.getElementById("duration");
const startButton = document.getElementById("start_btn");
const resetButton = document.getElementById("reset_btn");
const pauseButton = document.getElementById("pause_btn");
let minutes = document.getElementById("minutes");
let seconds = document.getElementById("seconds");

let quotes = document.getElementById("quotes");

let switchOn = false;

class Session {
  duration;
  rest;
  timeLeft;
  sessionOn;
  time = {
    sessionMinutes: 0,
    sessionSeconds: 0,
  };
  constructor(duration, rest) {
    this.duration = duration;
    this.rest = rest;
  }
}

let currentSession = new Session(2, 2);
currentSession.time[0] = 0;
currentSession.time[1] = 0;

var t;

duration.addEventListener("input", function () {
  if (duration.value === "regular") {
    currentSession.duration = 2;
    minutes.value = currentSession.duration;
  } else if (duration.value === "long") {
    currentSession.duration = 40;
    minutes.value = currentSession.duration;
  } else if (duration.value === "extra-long") {
    currentSession.duration = 60;
    minutes.value = currentSession.duration;
  } else if (duration.value === "timer") {
    // User timer. Check data and start countdown
    startButton.innerHTML = "Set countdown";
  }
});

startButton.addEventListener("click", function () {
  countdown();
});

function countdown() {
  let sec = 59;

  currentSession.sessionOn = true;
  let min = currentSession.duration - 1;

  t = setInterval(function () {
    if (sec < 10) {
      seconds.value = "0" + sec;
    } else {
      seconds.value = sec;
    }
    if (min < 10) {
      minutes.value = "0" + min;
    } else {
      minutes.value = min;
    }

    sec = sec - 1;

    if (sec < 0) {
      if (min === 0) {
        if (currentSession.sessionOn === true) {
          min = currentSession.rest;
          if (min < 10) {
            minutes.value = "0" + min;
          } else {
            minutes.value = min;
          }
          currentSession.sessionOn = false;
          console.log("break!!!");
        } else {
          min = currentSession.duration;
          if (min < 10) {
            minutes.value = "0" + min;
          } else {
            minutes.value = min;
          }
          currentSession.sessionOn = true;
          console.log("session!!!!");
        }
      }
      min = min - 1;
      sec = 59;
    }

    console.log(`${minutes.value} : ${seconds.value}`);
  }, 1000);
}

pauseButton.addEventListener("click", function () {
  currentSession.time[0] = minutes.value;
  currentSession.time[1] = seconds.value;

  clearInterval(t);

  console.log(currentSession.time[0]);
  console.log(currentSession.time[1]);
});

resetButton.addEventListener("click", function () {
  clearInterval(t);
  seconds.value = "0" + 0;
  minutes.value = currentSession.duration;
  startButton.innerHTML = "Start study session";
});

// set countdown for user timer
// const finish = currentSession.duration * 60000;
// let now = new Date();
// let current = now.getMilliseconds();
// let target = now.setMilliseconds(current + finish);

// countdown();

// function countdown(target) {
//   t = setInterval(function () {
//     const today = new Date().getTime();
//     const distance = target - today;

//     sec = Math.floor((distance / 1000) % 60);
//     min = Math.floor((distance / 1000 / 60) % 60);

//     minutes.value = min;

//     if (sec < 10) {
//       seconds.value = "0" + sec;
//     } else {
//       seconds.value = sec;
//     }

//     if (distance < 0) {
//       console.log("OVER");
//       minutes.value = currentSession.rest;
//       seconds.value = 0;

//       clearInterval(t);
//     }
//   }, 0);
// }
// switchOn = !switchOn
// if(switchOn){
//   currentSession.sessionOn = true
//   countdown()

// }
// else {
//   // startButton.removeEventListener("click", countdown)
//   e.stopPropagation()
// }
