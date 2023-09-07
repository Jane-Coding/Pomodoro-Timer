const duration = document.getElementById("duration");
const startButton = document.getElementById("start_btn");
let minutes = document.getElementById("minutes");
let seconds = document.getElementById("seconds");

duration.addEventListener("input", function () {
  if (duration.value === "regular") {
    minutes.value = 25;
  } else if (duration.value === "long") {
    minutes.value = 40;
  } else if (duration.value === "extra-long") {
    minutes.value = 60;
  }
});

startButton.addEventListener("click", function () {
  const finish = minutes.value * 60000;
  let now = new Date();
  let current = now.getMilliseconds();
  let target = now.setMilliseconds(current + finish);

  countdown(target);

  function countdown(target) {
    let t = setInterval(function () {
      const today = new Date().getTime();
      const distance = target - today;

      seconds.value = Math.floor((distance / 1000) % 60);
      minutes.value = Math.floor((distance / 1000 / 60) % 60);

      if (distance < 0) {
        console.log("OVER");
        seconds.value = 0;
        minutes.value = 0;

        clearInterval(t);
      }
    }, 0);
  }
});
