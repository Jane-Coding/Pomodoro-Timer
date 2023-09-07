const duration = document.getElementById("duration");
const startButton = document.getElementById("start_btn");
const resetButton = document.getElementById("reset_btn");
let minutes = document.getElementById("minutes");
let seconds = document.getElementById("seconds");

class Session {
  duration;
  rest;
  timeLeft;
  constructor(duration, rest) {
    this.duration = duration;
    this.rest = rest;
  }
}

let currentSession = new Session(2, 5);

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
  }
});

startButton.addEventListener("click", function (e) {
  startButton.innerHTML = "--- Pause ---";
  const finish = currentSession.duration * 60000;
  let now = new Date();
  let current = now.getMilliseconds();
  let target = now.setMilliseconds(current + finish);

  countdown(target);

  function countdown(target) {
    t = setInterval(function () {
      const today = new Date().getTime();
      const distance = target - today;

      sec = Math.floor((distance / 1000) % 60);
      min = Math.floor((distance / 1000 / 60) % 60);

      minutes.value = min;

      if (sec < 10) {
        seconds.value = "0" + sec;
      } else {
        seconds.value = sec;
      }

      if (distance < 0) {
        console.log("OVER");
        minutes.value = currentSession.rest;
        seconds.value = 0;

        // clearInterval(t);
      }
    }, 0);
  }
});

resetButton.addEventListener("click", function () {
  clearInterval(t);
  seconds.value = "0" + 0;
  minutes.value = currentSession.duration;
  startButton.innerHTML = "Start study session";
});
