const duration = document.getElementById("duration");
const startButton = document.getElementById("start_btn");
const resetButton = document.getElementById("reset_btn");
const pauseButton = document.getElementById("pause_btn");
let minutes = document.getElementById("minutes");
let seconds = document.getElementById("seconds");

let quotes = document.getElementById("quotes");

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

  set setMin(min) {
    this.#sessionMinutes = min;
  }
  set setSec(sec) {
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

let currentSession = new Study(25, 5);

var t;

duration.addEventListener("input", function () {
  if (t) {
    confirmReset();
  } else {
    checkDuration();
  }
});

function checkDuration() {
  if (duration.value === "regular") {
    currentSession.duration = reguralSession.duration;
    currentSession.rest = reguralSession.rest;
    minutes.value = reguralSession.duration;
    startButton.innerHTML = "Start study session";
  } else if (duration.value === "long") {
    currentSession.duration = longSession.duration;
    currentSession.rest = longSession.rest;
    minutes.value = longSession.duration;
    startButton.innerHTML = "Start study session";
  } else if (duration.value === "extra-long") {
    currentSession.duration = extralongSession.duration;
    currentSession.rest = extralongSession.rest;
    minutes.value = extralongSession.duration;
    startButton.innerHTML = "Start study session";
  } else if (duration.value === "timer") {
    minutes.value = "00";
    seconds.value = "00";
    currentSession.rest = "none";
    startButton.innerHTML = "Set time to countdown";

    minutes.addEventListener("input", function () {
      if (minutes.value < 10) {
        minutes.value = "0" + Number(minutes.value);
        currentSession.setMin = minutes.value;
      }
       else {
        currentSession.setMin = minutes.value;
      }
    });
    seconds.addEventListener("input", function () {
      if (seconds.value < 10) {
        seconds.value = "0" + Number(seconds.value);
        currentSession.setSec = seconds.value        
      } 
      else {
        currentSession.setSec = seconds.value;
      }
    });
  }
}

function confirmReset() {
  const response = confirm(
    "If you change duration now it will reset current session. Are you sure you want to continue?"
  );
  if (response) {
    console.log("Restart session");
    fullReset();
  } else {
    console.log("Do nothing");
    if (currentSession.duration == 25) {
      duration.value = "regular";
    } else if (currentSession.duration == 40) {
      duration.value = "long";
    } else if (currentSession.duration == 60) {
      duration.value = "extra-long";
    } else {
      duration.value = "timer";
    }
  }
}

startButton.addEventListener("click", function () {
  if (currentSession.min == 0 && currentSession.sec == 0) {
    if (currentSession.rest === "none") {
      alert("You forgot to set timer!!!");
      fullReset();
    } else {
      currentSession.sessionOn = true;
      startButton.innerHTML = "Session in progress";
      countdown(currentSession.duration, 59);
    }
  } else {
    currentSession.setMin = Number(currentSession.min) + 1;
    currentSession.setSec = Number(currentSession.sec) - 1;
    if (currentSession.sessionOn === true) {
      startButton.innerHTML = "Session in progress";
    } else if (currentSession.rest === "none") {      
      startButton.innerHTML = "Timer countdown";
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
        if (currentSession.rest === "none") {
          fullReset();
        } else if (currentSession.sessionOn === true) {
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

pauseButton.addEventListener("click", function (e) {
  if (!t) {
    e.preventDefault();
  } else {
    clearInterval(t);

    currentSession.setMin = minutes.value;
    currentSession.setSec = seconds.value;
    console.log(currentSession.min);
    console.log(currentSession.sec);

    if (minutes.value == currentSession.duration) {
      startButton.innerHTML = "Start study session";
    } else {
      startButton.innerHTML = "Continue";
    }
  }
});

resetButton.addEventListener("click", function () {
  fullReset();
});

function fullReset() {
  clearInterval(t);
  t = !t;
  seconds.value = "0" + 0;
  checkDuration();
  currentSession.setMin = 0;
  currentSession.setSec = 0;
}