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
    '<a class="ministry-link" href="https://www.tbcwichita.com/events/generation-one--31/2026-09-17" target="_blank" rel="noopener">' +
      '<img src="https://raw.githubusercontent.com/jacobreese95/generation-one/main/img/generation_one_logo_modified.png" alt="Generation One">' +
      '<span>Generation One</span>' +
    '</a>' +
    '<a class="ministry-link" href="https://tbawichita.org" target="_blank" rel="noopener">' +
      '<span class="school-mark">TBS</span>' +
      '<span>School</span>' +
    '</a>';
  var footer = document.querySelector('.site-footer');
  if (footer && footer.parentNode) footer.parentNode.insertBefore(bar, footer);
  else document.body.appendChild(bar);
})();
