(function () {
  if (document.querySelector('.ministry-bar')) return;
  var bar = document.createElement('nav');
  bar.className = 'ministry-bar';
  bar.setAttribute('aria-label', 'Church ministries');
  bar.innerHTML =
    '<a class="ministry-link" href="index.html">' +
      '<img src="https://tbc-app.jacobreese95.workers.dev/tbclogo.jpeg" alt="Temple Baptist Church">' +
      '<span>Church</span>' +
    '</a>' +
    '<a class="ministry-link" href="https://htmlpreview.github.io/?https://github.com/jacobreese95/generation-one/blob/main/index.html">' +
      '<img src="https://raw.githubusercontent.com/jacobreese95/generation-one/main/img/generation_one_logo_modified.png" alt="Generation One">' +
      '<span>Generation One</span>' +
    '</a>' +
    '<a class="ministry-link" href="https://htmlpreview.github.io/?https://github.com/jacobreese95/TBC-Academy/blob/main/index.html">' +
      '<span class="school-mark">TBA</span>' +
      '<span>Academy</span>' +
    '</a>';
  document.body.appendChild(bar);
})();
