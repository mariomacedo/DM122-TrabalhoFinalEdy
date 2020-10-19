import HtmlService from "./HtmlService.js";
import DoBService from "./DoBService.js";

class App {
  constructor() {
    this.registerServiceWorker();
    this.bindFormListener();
  }

  registerServiceWorker() {
    if ("serviceWorker" in navigator) {
      const onsuccess = () => console.log("[Service Worker] Registered");
      const onfailure = () => console.log("[Service Worker] Failed");

      navigator.serviceWorker
        .register("sw.js")
        .then(onsuccess)
        .catch(onfailure);
    }
  }

  bindFormListener() {
    const form = document.querySelector("form");
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      this.saveToStorage(form);
    });
  }

  saveToStorage(form) {
    const fullName = form.fullName.value;
    const dob = form.dob.value;
    if (fullName && dob) {
      console.log("valid");
      form.reset();
    }
  }
}

new App();
