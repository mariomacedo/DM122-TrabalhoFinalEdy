import DoBService from "./DoBService.js";
import HtmlService from "./HtmlService.js";

class App {
  constructor() {
    this.registerServiceWorker();
    this.start();
  }

  start() {
    const dobService = new DoBService();
    new HtmlService(dobService);
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
}

new App();
