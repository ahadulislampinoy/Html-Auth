//- Firebase configuration
const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCHTlDXnhLBc1z9QBB5kHV6m6ZLGHn9BUw",
  authDomain: "email-pass-authentication-a1.firebaseapp.com",
  projectId: "email-pass-authentication-a1",
  storageBucket: "email-pass-authentication-a1.appspot.com",
  messagingSenderId: "178982690664",
  appId: "1:178982690664:web:95b6d7280c6994efe480dd",
});
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const provider = new firebase.auth.GoogleAuthProvider();

// - Set user data
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    const message = document.getElementById("message");
    const logOutBtn = document.getElementById("logout-btn");
    if (message) {
      message.innerText = "Welcome " + user.displayName;
    }
    if (logOutBtn) {
      logOutBtn.classList.remove("hidden");
    }
  }
});

// - Register new user
const registerUser = () => {
  const name = document.getElementById("reg-name").value;
  const email = document.getElementById("reg-email").value;
  const password = document.getElementById("reg-password").value;
  console.log(name, email, password);
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      user
        .updateProfile({
          displayName: name,
        })
        .then(() => {
          console.log("Register success");
        })
        .catch((error) => {
          console.log("Register error:-", error.message);
        });
    })
    .catch((error) => {
      console.log("Register error:-", error.message);
    });
};

// - Login user
const logInUser = () => {
  const email = document.getElementById("log-email").value;
  const password = document.getElementById("log-password").value;
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("Login success");
    })
    .catch((error) => {
      console.log("Login error:-", error.message);
    });
};

// - Logout user
const logOutUser = () => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      const logOutBtn = document.getElementById("logout-btn");
      const message = document.getElementById("message");
      message.innerText = "Not authenticated yet!";
      logOutBtn.classList.add("hidden");
      console.log("Logout successfull");
    })
    .catch((error) => {
      console.log(console.log("Logout error:-", error.message));
    });
};

// - Login with Google
const logInWithGoogle = () => {
  firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => {
      var user = result.user;
    })
    .catch((error) => {
      console.log("Google error:-", error.message);
    });
};

//- Navigate between login and register forms like a single page application
document.addEventListener("DOMContentLoaded", function () {
  const gotoLogin = document.getElementById("goto-login");
  const gotoRegister = document.getElementById("goto-register");
  const login = document.getElementById("login");
  const register = document.getElementById("register");

  function showLoginForm() {
    login.classList.remove("hidden");
    register.classList.add("hidden");
  }

  function showRegisterForm() {
    login.classList.add("hidden");
    register.classList.remove("hidden");
  }

  gotoRegister.addEventListener("click", function (event) {
    event.preventDefault();
    showRegisterForm();
  });

  gotoLogin.addEventListener("click", function (event) {
    event.preventDefault();
    showLoginForm();
  });

  // Initial state: show login form by default
  showLoginForm();
});
