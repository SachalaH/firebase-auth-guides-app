// Guide list update
const guideList = document.querySelector(".guides");
// settign up guides
const setUpGuides = (docs) => {
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
};

// Initializing materialize components
document.addEventListener("DOMContentLoaded", () => {
  const modals = document.querySelectorAll(".modal");
  const items = document.querySelectorAll(".collapsible");

  M.Modal.init(modals);
  M.Collapsible.init(items);
});
