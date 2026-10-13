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
  function ensureCropper(done) {
    if (window.Cropper) return done();
    var link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://cdn.jsdelivr.net/npm/cropperjs@1.6.2/dist/cropper.min.css";
    document.head.appendChild(link);
    var s = document.createElement("script");
    s.src = "https://cdn.jsdelivr.net/npm/cropperjs@1.6.2/dist/cropper.min.js";
    s.onload = done;
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
    var addBtn = document.getElementById("addPhotoBtn");
    if (addBtn) addBtn.classList.add("show");
    function usePhoto(url) {
      data.featurePhoto = url;
      if (photo) photo.src = url;
    }
    function openCropper(src) {
      var picker = document.getElementById("photoPicker");
      if (picker) picker.remove();
      var old = document.getElementById("cropModal");
      if (old) old.remove();
      var modal = document.createElement("div");
      modal.id = "cropModal";
      modal.innerHTML = '<div class="crop-card"><div class="picker-top"><h2>Crop photo</h2><button type="button" id="cropCancel">Cancel</button></div><p>Drag the box to move it. Drag a corner to resize.</p><div class="crop-stage" id="cropStage"><img id="cropImage" alt=""></div><div class="login-actions"><button type="button" id="cropApply">Use this crop</button></div><p id="cropError"></p></div>';
      document.body.appendChild(modal);
      var stage = document.getElementById("cropStage");
      var image = document.getElementById("cropImage");
      image.src = src;
      var box = document.createElement("div");
      box.className = "crop-box";
      stage.appendChild(box);
      ["nw","ne","sw","se"].forEach(function (name) {
        var h = document.createElement("i");
        h.className = "crop-handle " + name;
        box.appendChild(h);
      });
      function placeBox() {
        var w = stage.clientWidth * 0.72;
        var h = w * 1.15;
        if (h > stage.clientHeight * 0.86) { h = stage.clientHeight * 0.86; w = h / 1.15; }
        box.style.width = w + "px";
        box.style.height = h + "px";
        box.style.left = ((stage.clientWidth - w) / 2) + "px";
        box.style.top = ((stage.clientHeight - h) / 2) + "px";
      }
      image.onload = placeBox;
      if (image.complete) placeBox();
      var drag = null;
      box.addEventListener("pointerdown", function (e) {
        var rect = box.getBoundingClientRect();
        var stageRect = stage.getBoundingClientRect();
        drag = { handle: e.target.classList.contains("crop-handle") ? e.target.className : "move", x: e.clientX, y: e.clientY, l: rect.left - stageRect.left, t: rect.top - stageRect.top, w: rect.width, h: rect.height };
        box.setPointerCapture(e.pointerId);
      });
      box.addEventListener("pointermove", function (e) {
        if (!drag) return;
        var dx = e.clientX - drag.x, dy = e.clientY - drag.y;
        var l = drag.l, t = drag.t, w = drag.w, h = drag.h;
        if (drag.handle.indexOf("se") > -1) { w = Math.max(80, drag.w + dx); h = Math.max(80, drag.h + dy); }
        else if (drag.handle.indexOf("sw") > -1) { w = Math.max(80, drag.w - dx); h = Math.max(80, drag.h + dy); l = drag.l + drag.w - w; }
        else if (drag.handle.indexOf("ne") > -1) { w = Math.max(80, drag.w + dx); h = Math.max(80, drag.h - dy); t = drag.t + drag.h - h; }
        else if (drag.handle.indexOf("nw") > -1) { w = Math.max(80, drag.w - dx); h = Math.max(80, drag.h - dy); l = drag.l + drag.w - w; t = drag.t + drag.h - h; }
        else { l = drag.l + dx; t = drag.t + dy; }
        l = Math.max(0, Math.min(l, stage.clientWidth - w));
        t = Math.max(0, Math.min(t, stage.clientHeight - h));
        box.style.left = l + "px"; box.style.top = t + "px"; box.style.width = w + "px"; box.style.height = h + "px";
      });
      box.addEventListener("pointerup", function () { drag = null; });
      document.getElementById("cropCancel").onclick = function () { modal.remove(); };
      document.getElementById("cropApply").onclick = function () {
        var stageRect = stage.getBoundingClientRect();
        var imgRect = image.getBoundingClientRect();
        var boxRect = box.getBoundingClientRect();
        var scaleX = image.naturalWidth / imgRect.width;
        var scaleY = image.naturalHeight / imgRect.height;
        var sx = Math.max(0, (boxRect.left - imgRect.left) * scaleX);
        var sy = Math.max(0, (boxRect.top - imgRect.top) * scaleY);
        var sw = Math.min(image.naturalWidth - sx, boxRect.width * scaleX);
        var sh = Math.min(image.naturalHeight - sy, boxRect.height * scaleY);
        var canvas = document.createElement("canvas");
        canvas.width = Math.max(1, Math.round(sw));
        canvas.height = Math.max(1, Math.round(sh));
        try {
          canvas.getContext("2d").drawImage(image, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height);
          usePhoto(canvas.toDataURL("image/jpeg", 0.85));
          modal.remove();
        } catch (err) {
          document.getElementById("cropError").textContent = "Could not crop this photo. Try Add a new photo instead.";
        }
      };
    }
    function prepareAndCrop(url) {
      fetch(url).then(function (r) { return r.blob(); }).then(function (blob) {
        openCropper(URL.createObjectURL(blob));
      }).catch(function () {
        openCropper(url);
      });
    }
    function uploadNewPhoto() {
      var input = document.createElement("input");
      input.type = "file";
      input.accept = "image/*";
      input.onchange = function () {
        var file = input.files[0];
        if (!file) return;
        openCropper(URL.createObjectURL(file));
      };
      input.click();
    }
    function pickPhoto() {
      var old = document.getElementById("photoPicker");
      if (old) old.remove();
      var modal = document.createElement("div");
      modal.id = "photoPicker";
      modal.innerHTML = '<div class="photo-picker"><div class="picker-top"><h2>Choose a photo</h2><button type="button" id="pickerClose">Close</button></div><p>Photos from the church app. Pick one, or add a new photo.</p><button type="button" id="pickerUpload">Add a new photo</button><div id="pickerGrid" class="picker-grid">Loading app photos...</div></div>';
      document.body.appendChild(modal);
      document.getElementById("pickerClose").onclick = function () { modal.remove(); };
      document.getElementById("pickerUpload").onclick = uploadNewPhoto;
      var grid = document.getElementById("pickerGrid");
      firebase.firestore().collection("photos").orderBy("createdAt", "desc").limit(60).get().then(function (snap) {
        grid.innerHTML = "";
        if (snap.empty) { grid.textContent = "No photos in the app yet."; return; }
        snap.forEach(function (doc) {
          var d = doc.data() || {};
          if (!d.url) return;
          var btn = document.createElement("button");
          btn.type = "button";
          var when = d.createdAt && d.createdAt.toDate ? d.createdAt.toDate().toLocaleDateString() : "";
          btn.innerHTML = '<img src="' + d.url + '" alt=""><small>' + (d.caption || "Photo") + (when ? " · " + when : "") + '</small>';
          btn.onclick = function () { prepareAndCrop(d.url); };
          grid.appendChild(btn);
        });
      }).catch(function (e) {
        grid.textContent = "Could not load app photos: " + e.message;
      });
    }
    var photo = document.getElementById("cms-feature-photo");
    if (photo) {
      photo.classList.add("editable");
      photo.title = "Click to change photo";
      photo.addEventListener("click", pickPhoto);
      if (addBtn) addBtn.addEventListener("click", pickPhoto);
    }
    document.getElementById("cmsSave").onclick = function () {
      document.querySelectorAll("[data-cms]").forEach(function (el) {
        data[el.getAttribute("data-cms")] = el.textContent.trim();
      });
      var msg = document.getElementById("cmsMsg");
      var user = firebase.auth().currentUser;
      var writes = [firebase.firestore().collection("website").doc("home").set(data)];
      if (user) writes.push(firebase.firestore().collection("users").doc(user.uid).set({ websiteHome: data }, { merge: true }));
      Promise.allSettled(writes).then(function (results) {
        var ok = results.some(function (r) { return r.status === "fulfilled"; });
        msg.textContent = ok ? "Saved" : "Missing or insufficient permissions. The app is blocking the website from saving.";
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
      if (!user) return;
      firebase.firestore().collection("users").doc(user.uid).get().then(function (doc) {
        var saved = doc.exists && doc.data() && doc.data().websiteHome;
        if (saved) apply(saved);
      }).catch(function () {});
    });
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) ensureCropper(enableEditing);
    });

  function showLogin() {
    var old = document.getElementById("loginModal");
    if (old) old.remove();
    var modal = document.createElement("div");
    modal.id = "loginModal";
    modal.innerHTML = '<div class="login-card"><h2>Login</h2><p>Same email and password as the church app.</p><label>Email</label><input id="loginEmail" type="email"><label>Password</label><input id="loginPassword" type="password"><div class="login-actions"><button type="button" id="loginGo">Login</button><button type="button" id="loginClose">Cancel</button></div><p id="loginError"></p></div>';
    document.body.appendChild(modal);
    document.getElementById("loginClose").onclick = function () { modal.remove(); };
    document.getElementById("loginGo").onclick = function () {
      firebase.auth().signInWithEmailAndPassword(document.getElementById("loginEmail").value.trim(), document.getElementById("loginPassword").value).then(function () {
        modal.remove();
      }).catch(function (e) {
        document.getElementById("loginError").textContent = e.message;
      });
    };
  }
  document.addEventListener("click", function (e) {
    if (e.target && e.target.id === "openLogin") {
      e.preventDefault();
      showLogin();
    }
  });
  });
})();
