// Add admin cloud function
const adminForm = document.querySelector(".admin-actions");
adminForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const adminEmail = document.querySelector("#admin-email").value;
  const addAdminRole = functions.httpsCallable("addAdminRole");
  addAdminRole({ email: adminEmail }).then((result) => {
    document.querySelector("#admin-email").value = "";
    console.log(result);
  });
});

// Listen for auth status changes
auth.onAuthStateChanged((user) => {
  if (user) {
    user.getIdTokenResult().then((idTokenResult) => {
      user.admin = idTokenResult.claims.admin;
      setupUI(user);
    });
    // Get data
    db.collection("guides").onSnapshot(
      (snapshot) => {
        setUpGuides(snapshot.docs);
      },
      (err) => console.log(err.message)
    );
  } else {
    setUpGuides([]);
    setupUI();
  }
});

// Create new guide
const createForm = document.querySelector("#create-form");
createForm.addEventListener("submit", (e) => {
  e.preventDefault();
  db.collection("guides")
    .add({
      title: createForm["title"].value,
      content: createForm["content"].value,
    })
    .then(() => {
      // close modal and reset form
      const create_modal = document.querySelector("#modal-create");
      M.Modal.getInstance(create_modal).close();
      createForm.reset();
    })
    .catch((err) => {
      console.log(err.message);
    });
});

// Sign up
const signupForm = document.querySelector("#signup-form");
signupForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // get user info
  const email = signupForm["signup-email"].value;
  const password = signupForm["signup-password"].value;

  // sign up the user
  auth
    .createUserWithEmailAndPassword(email, password)
    .then((cred) => {
      return db.collection("users").doc(cred.user.uid).set({
        bio: signupForm["signup-bio"].value,
      });
    })
    .then(() => {
      const signup_modal = document.querySelector("#modal-signup");
      M.Modal.getInstance(signup_modal).close();
      signupForm.reset();
    });
});

// Log out method
const logout = document.querySelector("#logout");
logout.addEventListener("click", (e) => {
  e.preventDefault();
  auth.signOut();
});

// Login
const loginForm = document.querySelector("#login-form");
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  // getting user info
  const email = loginForm["login-email"].value;
  const password = loginForm["login-password"].value;

  auth.signInWithEmailAndPassword(email, password).then((cred) => {
    // closing the login modal
    const login_modal = document.querySelector("#modal-login");
    M.Modal.getInstance(login_modal).close();
    loginForm.reset();
  });
});
