(function () {
  var config = {
    apiKey: "AIzaSyChN8xvRz0R2Zo6NUEeHRBHib2XoxVb4nE",
    authDomain: "tbc-app-60125.firebaseapp.com",
    projectId: "tbc-app-60125",
    storageBucket: "tbc-app-60125.firebasestorage.app",
    messagingSenderId: "813699285807",
    appId: "1:813699285807:web:50216bcc58355a49ca97da"
  };
  function apply(data) {
    if (!data) return;
    Object.keys(data).forEach(function (key) {
      if (key === "featurePhoto") {
        var img = document.getElementById("cms-feature-photo");
        if (img && data[key]) img.src = data[key];
        return;
      }
      var el = document.querySelector('[data-cms="' + key + '"]');
      if (el && data[key]) el.textContent = data[key];
    });
  }
  fetch("content.json", { cache: "no-store" }).then(function (r) { return r.ok ? r.json() : null; }).then(apply).catch(function () {});
  var s = document.createElement("script");
  s.src = "https://www.gstatic.com/firebasejs/10.14.1/firebase-app-compat.js";
  s.onload = function () {
    var s2 = document.createElement("script");
    s2.src = "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore-compat.js";
    s2.onload = function () {
      try {
        if (!firebase.apps.length) firebase.initializeApp(config);
        firebase.firestore().collection("website").doc("home").get().then(function (doc) {
          if (doc.exists) apply(doc.data());
        }).catch(function () {});
      } catch (e) {}
    };
    document.head.appendChild(s2);
  };
  document.head.appendChild(s);
})();
