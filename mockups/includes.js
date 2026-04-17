// Load any element with `data-include="path"` by fetching that HTML fragment
// and replacing the element's innerHTML. Used for the shared sidebar + header
// so they're defined once in partials/ instead of duplicated on every page.
async function loadPartials() {
  const hosts = document.querySelectorAll('[data-include]');
  await Promise.all([...hosts].map(async (el) => {
    const res = await fetch(el.dataset.include);
    el.innerHTML = await res.text();
  }));
}

function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('collapsed');
  document.body.classList.toggle('sidebar-collapsed');
}

document.addEventListener('DOMContentLoaded', loadPartials);
