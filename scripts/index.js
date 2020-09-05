// Guide list update
const guideList = document.querySelector(".guides");

const loggedOutLinks = document.querySelectorAll(".logged-out");
const loggedInLinks = document.querySelectorAll(".logged-in");

const accountDetails = document.querySelector(".account-details");

const setupUI = (user) => {
  if (user) {
    // Account info
    const html = `<div>Logged in as ${user.email}</div>`;
    accountDetails.innerHTML = html;
    // Toggle ui elements
    loggedInLinks.forEach((link) => {
      link.style.display = "block";
    });
    loggedOutLinks.forEach((link) => {
      link.style.display = "none";
    });
  } else {
    // Hide account info
    accountDetails.innerHTML = "";
    // Toggle ui elements
    loggedInLinks.forEach((link) => {
      link.style.display = "none";
    });
    loggedOutLinks.forEach((link) => {
      link.style.display = "block";
    });
  }
};
// settign up guides
const setUpGuides = (docs) => {
  if (docs.length) {
    let html = "";

    docs.forEach((doc) => {
      const guide = doc.data();
      const li = `
    <li>
      <div class="collapsible-header grey lighten-4">${guide.title}</div>
      <div class="collapsible-body white">${guide.content}</div>
    </li>`;
      html += li;
    });
    guideList.innerHTML = html;
  } else {
    guideList.innerHTML = '<h5 class="center-align">Login to view guides.</h5>';
  }
};

// Initializing materialize components
document.addEventListener("DOMContentLoaded", () => {
  const modals = document.querySelectorAll(".modal");
  const items = document.querySelectorAll(".collapsible");

  M.Modal.init(modals);
  M.Collapsible.init(items);
});
