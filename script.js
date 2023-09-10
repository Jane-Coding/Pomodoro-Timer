const duration = document.getElementById("duration");
const startButton = document.getElementById("start_btn");
const resetButton = document.getElementById("reset_btn");
const pauseButton = document.getElementById("pause_btn");
let minutes = document.getElementById("minutes");
let seconds = document.getElementById("seconds");

let quotes = document.getElementById("quotes");

// let switchOn = false;

class Session {
  duration;
  rest;

  constructor(duration, rest) {
    this.duration = duration;
    this.rest = rest;
  }
}

class Study extends Session {
  sessionOn;

  #sessionMinutes = 0;
  #sessionSeconds = 0;

  set timeMin(min) {
    this.#sessionMinutes = min;
  }
  set timeSec(sec) {
    this.#sessionSeconds = sec;
  }

  get min() {
    return this.#sessionMinutes;
  }
  get sec() {
    return this.#sessionSeconds;
  }
}

const reguralSession = new Session(25, 5);
const longSession = new Session(40, 10);
const extralongSession = new Session(60, 20);

let currentSession = new Study(1, 1);

var t;

duration.addEventListener("input", function () {
  if (duration.value === "regular") {
    currentSession.duration = reguralSession.duration;
    minutes.value = reguralSession.duration;
    startButton.innerHTML = "Start study session";
  } else if (duration.value === "long") {
    currentSession.duration = longSession.duration;
    minutes.value = longSession.duration;
    startButton.innerHTML = "Start study session";
  } else if (duration.value === "extra-long") {
    currentSession.duration = extralongSession.duration;
    minutes.value = extralongSession.duration;
    startButton.innerHTML = "Start study session";
  } else if (duration.value === "timer") {
    // User timer. Check data and start countdown
    startButton.innerHTML = "Set countdown";
  }
});

startButton.addEventListener("click", function () {
  if (currentSession.min == 0 && currentSession.sec == 0) {
    currentSession.sessionOn = true;
    startButton.innerHTML = "Session in progress";
    countdown(currentSession.duration, 59);
  } else {
    currentSession.timeMin = Number(currentSession.min) + 1;
    currentSession.timeSec = Number(currentSession.sec) - 1;
    if (currentSession.sessionOn === true) {
      startButton.innerHTML = "Session in progress";
    } else {
      startButton.innerHTML = "Break time!";
    }
    countdown(currentSession.min, currentSession.sec);
  }
});

function countdown(min, sec) {
  min--;

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
          startButton.innerHTML = "Break time!";
          console.log("break!!!");
        } else {
          min = currentSession.duration;
          if (min < 10) {
            minutes.value = "0" + min;
          } else {
            minutes.value = min;
          }
          currentSession.sessionOn = true;
          startButton.innerHTML = "Session in progress";
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
  clearInterval(t);

  currentSession.timeMin = minutes.value;
  currentSession.timeSec = seconds.value;
  console.log(currentSession.min);
  console.log(currentSession.sec);

  if (minutes.value == currentSession.duration) {
    startButton.innerHTML = "Start study session";
  } else {
    startButton.innerHTML = "Continue";
  }
});

resetButton.addEventListener("click", function () {
  clearInterval(t);
  seconds.value = "0" + 0;
  minutes.value = currentSession.duration;
  currentSession.timeMin = 0;
  currentSession.timeSec = 0;
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
