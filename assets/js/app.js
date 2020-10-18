"use strict";

if ("serviceWorker" in navigator) {
  const onSuccess = () => console.log("[Service Worker] Registered");
  const onFail = (err) => console.error("[Service Worker] Service Worker fail");

  navigator.serviceWorker.register("sw.js").then(onSuccess).catch(onFail);
}
