(function () {
  if (document.querySelector('.ministry-bar')) return;
  var style = document.createElement('style');
  style.textContent = '.ministry-bar{display:flex;justify-content:center;align-items:center;gap:2.5rem;flex-wrap:wrap;background:#7a8fac;padding:2rem 1rem 2.4rem}.ministry-bar a{display:flex;flex-direction:column;align-items:center;gap:.75rem;color:#fff;text-decoration:none;font-weight:700;font-size:1.15rem;letter-spacing:.04em;text-transform:uppercase}.ministry-bar img{width:280px!important;height:280px!important;max-width:none!important;object-fit:contain;background:transparent;filter:brightness(0) invert(1)}.ministry-bar .school-mark{width:280px!important;height:280px!important;display:grid;place-items:center;color:#fff;border:3px solid #fff;border-radius:24px;font-size:3.2rem;font-weight:800}';
  document.head.appendChild(style);
  var bar = document.createElement('nav');
  bar.className = 'ministry-bar';
  bar.setAttribute('aria-label', 'Church ministries');
  bar.innerHTML =
    '<a href="index.html"><img style="width:280px;height:280px;max-width:none" src="https://tbc-app.jacobreese95.workers.dev/tbclogo.jpeg" alt="Temple Baptist Church"><span>Church</span></a>' +
    '<a href="https://htmlpreview.github.io/?https://github.com/jacobreese95/generation-one/blob/main/index.html"><img style="width:280px;height:280px;max-width:none" src="https://raw.githubusercontent.com/jacobreese95/generation-one/main/img/generation_one_logo_modified.png" alt="Generation One"><span>Generation One</span></a>' +
    '<a href="https://htmlpreview.github.io/?https://github.com/jacobreese95/TBC-Academy/blob/main/index.html"><span class="school-mark">TBA</span><span>Academy</span></a>';
  document.body.appendChild(bar);
})();
