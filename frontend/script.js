// Input Box
let nameBox = document.querySelector(".nameBox");
let emailBox = document.querySelector(".emailBox");
let password = document.querySelector(".password");
let passwordBox = document.querySelector(".password-box");
let openEye = document.querySelector(".open-eye");
let closeEye = document.querySelector(".close-eye");

openEye.addEventListener("click", () => {
  closeEye.classList.toggle("hide");
  openEye.classList.toggle("hide");
  password.setAttribute("type", "password");
});

closeEye.addEventListener("click", () => {
  closeEye.classList.toggle("hide");
  openEye.classList.toggle("hide");
  password.setAttribute("type", "text");
});

//For making the search icon clickable
const details = document.querySelector(".details");
const searchinput = document.querySelector(".search-input");
const searchicon = document.querySelector(".search-icon");
searchicon.addEventListener("click", () => {
  searchinput.focus();
  searchinput.autofocus = true;
});

//For creating a popup for Sign-in
const signUp = document.querySelector(".sign-up");
const signOut = document.querySelector(".sign-out");
const logIn = document.querySelector(".log-in");
const navsignin = document.querySelector(".nav-signin");
const helloUser = document.querySelector(".hello-user");
const storedName = localStorage.getItem("userName");
if (storedName) {
  helloUser.innerText = storedName;
}

updatePopupButtons();

const popup = document.querySelector(".nav-signin-popup");
const discard = document.querySelector(".discard");
const main = document.querySelector(".main");
navsignin.addEventListener("click", () => {
  popup.classList.toggle("hide");
  main.classList.toggle("background-change");
  updatePopupButtons();
});

//For Sign Up

signUp.addEventListener("click", async () => {
  const userData = {
    userName: nameBox.value,
    userEmail: emailBox.value,
    password: password.value,
  };

  if (!userData.userName || !userData.userEmail || !userData.password) {
    showToast("Please fill all the details to sign up.");
    return;
  }

  try {
    const res = await fetch("https://amazon-clone-mj7w.onrender.com/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (res.status === 404) {
      showToast("Account already exists");
      return;
    }

    if (!res.ok) throw new Error("Failed to post user data");

    const data = await res.json();
    localStorage.setItem("userName", data.userName);
    showToast("Signed in successfully!");
    helloUser.innerText = data.userName;

    nameBox.value = "";
    emailBox.value = "";
    password.value = "";
    popup.classList.toggle("hide");
    main.classList.toggle("background-change");
  } catch (error) {
    console.error("Error posting data:", error);
    showToast("Error signing in!");
  }
});

// For Sign Out

signOut.addEventListener("click", async () => {
  // const userName = localStorage.getItem("userName");
  localStorage.removeItem("userName");
  helloUser.innerText = "sign in";
  updatePopupButtons();
  popup.classList.add("hide");
  main.classList.remove("background-change");
});

// For Log In

logIn.addEventListener("click", async () => {
  const userName = nameBox.value;
  const userEmail = emailBox.value;
  const userPassword = password.value;

  if (!userName || !userEmail || !userPassword) {
    showToast("Please fill email and password to login.");
    return;
  }

  try {
    const res = await fetch(
      `https://amazon-clone-mj7w.onrender.com/api/user/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userName, userEmail, password: userPassword }),
      }
    );

    if (!res.ok) {
      showToast("Invalid credentials!");
      return;
    }

    const data = await res.json();
    localStorage.setItem("userName", data.userName);
    helloUser.innerText = data.userName;

    showToast("Logged in successfully!");

    nameBox.value = "";
    emailBox.value = "";
    password.value = "";

    popup.classList.add("hide");
    main.classList.remove("background-change");
  } catch (error) {
    console.error("Error logging in:", error);
    showToast("Error logging in!");
  }
});

//Discard in popup for sign-in

discard.addEventListener("click", () => {
  popup.classList.toggle("hide");
  main.classList.toggle("background-change");
  nameBox.value = "";
  emailBox.value = "";
  password.value = "";
});

// For centering Popup

function centerpopup() {
  var popup = document.querySelector(".nav-signin-popup");
  var popupWidth = popup.offsetWidth;
  var popupHeight = popup.offsetHeight;

  popup.style.marginLeft = -popupWidth / 2 + "px";
  popup.style.marginTop = -popupHeight / 2 + "px";
}

window.addEventListener("resize", centerpopup);

centerpopup();

// For Toast Notification when user signs in

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.remove("hide");
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
    toast.classList.add("hide");
  }, 3000);
}

// For handling buttons

function updatePopupButtons() {
  if (localStorage.getItem("userName")) {
    signUp.classList.add("hide");
    logIn.classList.add("hide");
    signOut.classList.remove("hide");
    details.classList.add("hide");
  } else {
    signUp.classList.remove("hide");
    logIn.classList.remove("hide");
    signOut.classList.add("hide");
    details.classList.remove("hide");
  }
}

// Slideshow
let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides((slideIndex += n));
}

function currentSlide(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  let i;
  let slides = document.querySelectorAll(".slides");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slides[slideIndex - 1].style.display = "block";
}
