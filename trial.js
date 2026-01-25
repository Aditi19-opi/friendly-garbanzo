const loginPopup = document.getElementById("loginPopup");

function openLogin() {
  loginPopup.classList.add("openLogin");
}

function closeLogin() {
  loginPopup.classList.remove("openLogin");
}

const registerPopup = document.getElementById("registerPopup");

function openRegister() {
  registerPopup.classList.add("openRegister");
}

function closeRegister() {
  registerPopup.classList.remove("openRegister");
}

// error
const emailInput = document.getElementById("emailInput");
const passwordInput = document.getElementById("passwordInput");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");
const userForm = document.getElementById("userForm");

function checkLogin(event) {
  event.preventDefault();

  emailError.textContent = "";
  passwordError.textContent = "";

  let hasError = false;

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(emailInput.value.trim())) {
    emailError.textContent = "Invalid email";
    hasError = true;
  }

  if (passwordInput.value.trim() === "") {
    passwordError.textContent = "Password is required";
    hasError = true;
  }

  if (!hasError) {
    alert("Login successfully!");
    closeLogin();
  }
  userForm.reset();
}
userForm.addEventListener("submit", checkLogin);

// countdown
const days = document.getElementById("days");
const hours = document.getElementById("hours");
const minutes = document.getElementById("minutes");
const second = document.getElementById("seconds");

const targetDate = new Date("september 29, 2025 00:00:00").getTime();

setInterval(() => {
  let currentTime = new Date().getTime();
  let difference = targetDate - currentTime;

  if (difference <= 0) {
    days.innerHTML = "0";
    hours.innerHTML = "00";
    minutes.innerHTML = "00";
    second.innerHTML = "00";
    return;
  }

  let d = Math.floor(difference / (1000 * 60 * 60 * 24));
  let h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  let s = Math.floor((difference % (1000 * 60)) / 1000);

  days.innerHTML = d;
  hours.innerHTML = h.toString().padStart(2, "0");
  minutes.innerHTML = m.toString().padStart(2, "0");
  second.innerHTML = s.toString().padStart(2, "0");
}, 1000);

  const form = document.getElementById("registerForm");
  const steps = document.querySelectorAll(".form-step");
  const progress = document.querySelectorAll(".steps");
  let currentStep = 0;

  function showStep(index) {
    steps.forEach((step, i) => {
      step.style.display = i === index ? "block" : "none";
      progress[i].classList.toggle("active", i === index);
    });
    currentStep = index;
  }

  // Next button
  document.querySelectorAll(".nextBtn, .nextBtn2").forEach(btn => {
    btn.addEventListener("click", () => {
      const inputs = steps[currentStep].querySelectorAll("input[required]");
      let valid = true;
      inputs.forEach(input => {
        const error = input.nextElementSibling;
        if (input.value.trim() === "") {
          error.textContent = "This field is required";
          valid = false;
        } else {
          error.textContent = "";
        }
      });
      if (valid && currentStep < steps.length - 1) {
        showStep(currentStep + 1);
      }
    });
  });

  // Back button
  document.querySelectorAll(".backBtn").forEach(btn => {
    btn.addEventListener("click", () => {
      if (currentStep > 0) {
        showStep(currentStep - 1);
      }
    });
  });

  // Submit
  form.addEventListener("submit", e => {
    e.preventDefault();
    if (!document.getElementById("terms").checked) {
      alert("You must agree to Terms");
      return;
    }
    alert("Account Created ✅");
    form.reset();
    closeRegister();
  });
