import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

import {getMessaging, getToken, onMessage} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-messaging.js";

const firebaseConfig = {
  apiKey: "AIzaSyAFSDqasT1rkt55xw1NA7SknSQLzfyxBHg",
  authDomain: "rvm-notification.firebaseapp.com",
  projectId: "rvm-notification",
  storageBucket: "rvm-notification.firebasestorage.app",
  messagingSenderId: "814557927417",
  appId: "1:814557927417:web:720a45e7abaebb1207cf28",
  measurementId: "G-2PN1X98GQ3"
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

window.enableFCM = async function () {
  try {
    const permission = await Notification.requestPermission();

    if (permission !== "granted") {
      alert("Notification permission denied");
      return;
    }

    const token = await getToken(messaging, {
      vapidKey: "BPNWuskZ3rcDP2LObbaFFtqIXYa1WFldoSE0qs71C4hR_f6Rl6D24kwCBKqPOQ7KeMWqrcKSG_FGDpzGACzwDRo"
    });

    console.log("FCM TOKEN:");
    console.log(token);
    alert("FCM enabled. Check browser console.");

  } catch (err) {
    console.error("FCM ERROR:", err);
    alert("FCM failed. Check console.");
  }
};

onMessage(messaging, (payload) => {
  console.log("Foreground Message:", payload);
});
