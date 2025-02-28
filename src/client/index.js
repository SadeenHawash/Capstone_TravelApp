// js files
import { handleSubmit } from "./js/formHandler";

// sass files
import "./styles/style.scss";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  if (form) {
    form.addEventListener("submit", handleSubmit);
  }
});

// For service workers
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/service-worker.js")
    .then(() => console.log("Service Worker registered."))
    .catch((err) => console.log("Service Worker registration failed:", err));
}
