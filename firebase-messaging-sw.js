importScripts('https://www.gstatic.com/firebasejs/12.1.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/12.1.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyAFSDqasT1rkt55xw1NA7SknSQLzfyxBHg",
  authDomain: "rvm-notification.firebaseapp.com",
  projectId: "rvm-notification",
  storageBucket: "rvm-notification.firebasestorage.app",
  messagingSenderId: "814557927417",
  appId: "1:814557927417:web:720a45e7abaebb1207cf28"
});

// const messaging = firebase.messaging();
// messaging.onBackgroundMessage((payload) => {
//   console.log("[firebase-messaging-sw.js] Background message received", payload);
// });
const messaging = firebase.messaging();
messaging.onBackgroundMessage((payload) => {
  console.log("[firebase-messaging-sw.js] Background message received", payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/RVM/icon-192x192.png', 
    badge: '/RVM/icon-192x192.png',
    data: {
      click_action: payload.notification.click_action || "https://id-iffat.github.io/RVM/"
    }
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});
