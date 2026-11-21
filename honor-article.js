const menus = document.querySelectorAll('.honor-article nav[aria-label="Table of contents"]');
const links = [...menus].flatMap(menu => [...menu.querySelectorAll('a')]);
const headings = [...new Set(links.map(link => link.hash))]
  .map(hash => document.getElementById(hash.slice(1)))
  .filter(Boolean);

let scheduled = false;
function markCurrentSection() {
  scheduled = false;
  let current = headings[0];
  for (const heading of headings) {
    if (heading.getBoundingClientRect().top > 115) break;
    current = heading;
  }
  for (const link of links) {
    if (link.hash === '#' + current?.id) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  }
}

function scheduleUpdate() {
  if (!scheduled) {
    scheduled = true;
    requestAnimationFrame(markCurrentSection);
  }
}

const mobileMenu = document.querySelector('.reading-menu');
mobileMenu.addEventListener('click', event => {
  if (event.target.closest('a[href^="#"]')) mobileMenu.open = false;
});
mobileMenu.addEventListener('keydown', event => {
  if (event.key === 'Escape' && mobileMenu.open) {
    mobileMenu.open = false;
    mobileMenu.querySelector('summary').focus();
  }
});
window.addEventListener('scroll', scheduleUpdate, {passive: true});
window.addEventListener('resize', scheduleUpdate);
window.addEventListener('hashchange', scheduleUpdate);
markCurrentSection();
