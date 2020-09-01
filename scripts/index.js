// Initializing materialize components
document.addEventListener("DOMContentLoaded", () => {
  const modals = document.querySelectorAll(".modal");
  const items = document.querySelectorAll(".collapsible");

  M.Modal.init(modals);
  M.Collapsible.init(items);
});
