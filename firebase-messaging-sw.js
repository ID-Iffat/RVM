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

const messaging = firebase.messaging();
messaging.onBackgroundMessage((payload) => {
  console.log("[firebase-messaging-sw.js] Background message", payload);
  self.registration.showNotification(payload.notification?.title || "RVM Notification", {body: payload.notification?.body || ""});
});
