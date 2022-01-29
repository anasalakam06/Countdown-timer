//CONSTS
const adjustionCont = document.querySelector(".adj-sect");
const options = document.querySelectorAll(".timer-opt button");
const startCount = document.getElementById("playButton");
const pauseCount = document.getElementById("pauseButton");

//Lets
let duration;
let countdown;
let hours;
let minutes;
let seconds;
let HTMLhours = document.getElementById("hours");
let HTMLminutes = document.getElementById("minutes");
let HTMLseconds = document.getElementById("seconds");

//GSAP animations
let tl = gsap.timeline({ duration: 0.5, ease: "power1" });
tl.from(
     ".adj-cont",
     {
          opacity: 0,
          y: 80,
          duration: 1,
          ease: "back.out(1.7)",
     },
     "-=1"
)
     .from(
          ".opt-txt-holder h1",
          {
               opacity: 0,
               x: "-100",
          },
          "-=0.4"
     )
     .from(".timer-opt button", {
          y: -10,
          opacity: 0,
          stagger: 0.3,
     })
     .from(
          ".task-txt-holder h1",
          {
               opacity: 0,
               x: "-100",
          },
          "-=2.15"
     )
     .from(
          ".adj-task input",
          {
               opacity: 0,
               y: -10,
          },
          "-=1.7"
     )
     .from(
          ".adj-process button",
          {
               y: -10,
               opacity: 0,
               stagger: 0.2,
          },
          "-=1.4"
     );
gsapPause();

//Eventlisterners
document.getElementById("setTimer").addEventListener("click", () => {
     adjustionCont.classList.add("open");
     gsapPlay();
});

adjustionCont.addEventListener("click", (e) => {
     if (e.target.classList.contains("bg")) {
          adjustionCont.classList.remove("open");
          gsapPause();
     }
});
//Cancel adjustion
document.getElementById("cancelBtn").addEventListener("click", () => {
     adjustionCont.classList.remove("open");
     reset();
     gsapPause();
});
//Confirm button adjustion
document.getElementById("confBtn").addEventListener("click", () => {
     adjustionCont.classList.remove("open");
});

//Countdown code
options.forEach((option) => {
     //After clicking an option
     option.addEventListener("click", () => {
          let duration = option.getAttribute("data-time");

          //Function for the countdown
          const countdownFunc = () => {
               duration--;

               let hours = Math.floor(duration / 3600);
               let minutes = Math.floor((duration / 60) % 60);
               let seconds = duration % 60;

               HTMLhours.innerHTML = hours + "h";
               HTMLminutes.innerHTML = minutes + "m";
               HTMLseconds.innerHTML = seconds + "s";

               seconds =
                    seconds < 10
                         ? (HTMLseconds.innerHTML = seconds + "s")
                         : seconds;
               minutes =
                    minutes < 10
                         ? (HTMLminutes.innerHTML = minutes + "m")
                         : minutes;
               hours = hours < 10 ? (HTMLhours.innerHTML = hours + "h") : hours;

               //If time is out
               if (duration <= 0) {
                    clearInterval(countdown);
                    document.querySelector("#sound").play();
                    startCount.classList.remove("off");
                    pauseCount.classList.remove("on");

                    document
                         .querySelector(".notification-cont")
                         .classList.add("open");
                    document
                         .querySelector(".notification-cont-bg")
                         .classList.add("open");
               }
               animation =
                    764 - (duration / option.getAttribute("data-time")) * 764;
               document.querySelector(
                    ".circle-outline"
               ).style.strokeDashoffset = animation;
          };

          //Play button functioning
          startCount.addEventListener("click", () => {
               countdown = setInterval(countdownFunc, 1000);
               startCount.classList.add("off");
               pauseCount.classList.add("on");
               checkInputValue();
          });
          //Puase button functioning
          pauseCount.addEventListener("click", () => {
               clearInterval(countdown);
               startCount.classList.remove("off");
               pauseCount.classList.remove("on");
          });
     });
});

//Functions
function checkInputValue() {
     let inputValue = document.getElementById("taskInput").value;
     let notText = document.getElementById("notText");

     if (inputValue.length < 1) {
          notText.innerHTML = "King, time is out!";
     } else {
          notText.innerHTML = inputValue;
     }
}
function reset() {
     clearInterval(countdown);
     hours = 0;
     minutes = 0;
     seconds = 0;
     HTMLhours.innerHTML = 0 + "h";
     HTMLminutes.innerHTML = 0 + "m";
     HTMLseconds.innerHTML = 0 + "s";
     document.querySelector(
          ".circle-outline"
     ).style.animation = ` ${duration}s ease`;
}
function resetRefresh() {
     window.location.reload();
}
function dismiss() {
     document.querySelector("#sound").pause();
     resetRefresh();
     document.querySelector(".notification-cont").classList.remove("open");
     document.querySelector(".notification-cont-bg").classList.remove("open");
}
function gsapPause() {
     tl.restart();
     tl.pause();
}
function gsapPlay() {
     tl.play();
}

