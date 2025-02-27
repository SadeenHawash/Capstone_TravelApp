// js files
import { handleSubmit } from "./js/formHandler";

// sass files
// import "./public/styles/base.scss";
// import "./public/styles/footer.scss";
// import "./public/styles/form.scss";
// import "./public/styles/header.scss";
// import "./public/styles/resets.scss";
import "./styles/style.scss";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  if (form) {
    form.addEventListener("submit", handleSubmit);
  }
});

// For service workers
// if ("serviceWorker" in navigator) {
//   navigator.serviceWorker
//     .register("/service-worker.js")
//     .then(() => console.log("Service Worker registered."))
//     .catch((err) => console.log("Service Worker registration failed:", err));
// }
