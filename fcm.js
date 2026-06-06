import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import {getMessaging, getToken, deleteToken, onMessage} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-messaging.js";

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

    const registration = await navigator.serviceWorker.ready;
    console.log("SW registration:", registration);

    const token = await getToken(messaging, {
      vapidKey: "BPNWuskZ3rcDP2LObbaFFtqIXYa1WFldoSE0qs71C4hR_f6Rl6D24kwCBKqPOQ7KeMWqrcKSG_FGDpzGACzwDRo",
      serviceWorkerRegistration: registration
    });

    if (!token) {
      alert("Failed to get FCM token");
      return;
    }

    localStorage.setItem("fcmToken", token);
    localStorage.setItem("notificationsEnabled", "true");

    await fetch(
      "https://rvm.iffatadibamusaffa.workers.dev/register-token",
      {
        method: "POST",
        body: token
      }
    );

    console.log("FCM TOKEN:", token);
    console.log("Token Sent");

    return token;

  } catch (err) {
    console.error("FCM ERROR:", err);
    alert(err.message);
    return;
  }
};

// window.enableFCM = async function () {
//   const permission = await Notification.requestPermission();
//   if (permission !== "granted") {alert("Notification permission denied");
//     return;
//   }
//   const registration = await navigator.serviceWorker.ready;
//   console.log("SW registration:", registration);
//   const token = await getToken(messaging, {
//     vapidKey: "BPNWuskZ3rcDP2LObbaFFtqIXYa1WFldoSE0qs71C4hR_f6Rl6D24kwCBKqPOQ7KeMWqrcKSG_FGDpzGACzwDRo",
//     serviceWorkerRegistration: registration
//   } catch (err) {
//     console.error("FCM ERROR:", err);
//     alert(err.message);
//     return;
//   );
//   if (!token) {alert("Failed to get FCM token");
//     return;
//   }
  
//   localStorage.setItem("fcmToken", token);
//   localStorage.setItem("notificationsEnabled", "true");
//   await fetch("https://rvm.iffatadibamusaffa.workers.dev/register-token", {
//       method: "POST",
//       body: token
//     }
//   );

//   console.log("FCM TOKEN:", token);
//   console.log("Token Sent");
//   return token;
// };

window.disableFCM = async function () {
  const token = localStorage.getItem("fcmToken");
  try {
    if (token) {
      await fetch(
        "https://rvm.iffatadibamusaffa.workers.dev/unregister-token",
        {
          method: "POST",
          body: token
        }
      );
    }
  } catch (e) {
    console.error(e);
  }
  localStorage.removeItem("fcmToken");
  localStorage.setItem("notificationsEnabled", "false");
  console.log("FCM disabled");
};

// window.disableFCM = async function () {const token = localStorage.getItem("fcmToken");
//   if (!token) {localStorage.setItem("notificationsEnabled", "false");
//     return;
//   }
//   await fetch("https://rvm.iffatadibamusaffa.workers.dev/unregister-token", {
//       method: "POST",
//       body: token
//     }
//   );
//   await deleteToken(messaging);
//   localStorage.removeItem("fcmToken");
//   localStorage.setItem("notificationsEnabled", "false");
//   console.log("FCM disabled");
// };

onMessage(messaging, (payload) => {
  console.log("Foreground Message:", payload);
});
