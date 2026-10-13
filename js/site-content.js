(function () {
  var config = {
    apiKey: "AIzaSyChN8xvRz0R2Zo6NUEeHRBHib2XoxVb4nE",
    authDomain: "tbc-app-60125.firebaseapp.com",
    projectId: "tbc-app-60125",
    storageBucket: "tbc-app-60125.firebasestorage.app",
    messagingSenderId: "813699285807",
    appId: "1:813699285807:web:50216bcc58355a49ca97da"
  };
  var data = {};
  function apply(next) {
    if (!next) return;
    data = Object.assign({}, data, next);
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
  function loadScripts(done) {
    var s = document.createElement("script");
    s.src = "https://www.gstatic.com/firebasejs/10.14.1/firebase-app-compat.js";
    s.onload = function () {
      var s2 = document.createElement("script");
      s2.src = "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth-compat.js";
      s2.onload = function () {
        var s3 = document.createElement("script");
        s3.src = "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore-compat.js";
        s3.onload = done;
        document.head.appendChild(s3);
      };
      document.head.appendChild(s2);
    };
    document.head.appendChild(s);
  }
  function enableEditing() {
    document.body.classList.add("editing");
    var bar = document.createElement("div");
    bar.className = "edit-bar";
    bar.innerHTML = '<span>Editing</span><button type="button" id="cmsSave">Save</button><button type="button" id="cmsLogout">Log out</button><span id="cmsMsg"></span>';
    document.body.appendChild(bar);
    document.querySelectorAll("[data-cms]").forEach(function (el) {
      el.classList.add("editable");
      el.title = "Click to edit";
      el.addEventListener("click", function () {
        if (el.getAttribute("contenteditable") === "true") return;
        el.setAttribute("contenteditable", "true");
        el.focus();
      });
      el.addEventListener("blur", function () {
        el.removeAttribute("contenteditable");
        data[el.getAttribute("data-cms")] = el.textContent.trim();
      });
    });
    var photo = document.getElementById("cms-feature-photo");
    if (photo) {
      photo.classList.add("editable");
      photo.title = "Click to change photo";
      photo.addEventListener("click", function () {
        var input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*";
        input.onchange = function () {
          var file = input.files[0];
          if (!file) return;
          var reader = new FileReader();
          reader.onload = function () {
            var img = new Image();
            img.onload = function () {
              var canvas = document.createElement("canvas");
              var scale = Math.min(1, 1200 / img.width);
              canvas.width = Math.round(img.width * scale);
              canvas.height = Math.round(img.height * scale);
              canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height);
              data.featurePhoto = canvas.toDataURL("image/jpeg", 0.72);
              photo.src = data.featurePhoto;
            };
            img.src = reader.result;
          };
          reader.readAsDataURL(file);
        };
        input.click();
      });
    }
    document.getElementById("cmsSave").onclick = function () {
      document.querySelectorAll("[data-cms]").forEach(function (el) {
        data[el.getAttribute("data-cms")] = el.textContent.trim();
      });
      firebase.firestore().collection("website").doc("home").set(data).then(function () {
        document.getElementById("cmsMsg").textContent = "Saved";
      }).catch(function (e) {
        document.getElementById("cmsMsg").textContent = e.message;
      });
    };
    document.getElementById("cmsLogout").onclick = function () {
      firebase.auth().signOut().then(function () { location.reload(); });
    };
  }
  fetch("content.json", { cache: "no-store" }).then(function (r) { return r.ok ? r.json() : null; }).then(apply).catch(function () {});
  loadScripts(function () {
    if (!firebase.apps.length) firebase.initializeApp(config);
    firebase.firestore().collection("website").doc("home").get().then(function (doc) {
      if (doc.exists) apply(doc.data());
    }).catch(function () {});
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) enableEditing();
    });
  });
})();
