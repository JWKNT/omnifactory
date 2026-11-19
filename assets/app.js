// Load each note's static page into the index on its first open.
// Without this script, every closed panel still links to the note.
(() => {
  async function load(details) {
    if (details.dataset.loaded) return;
    details.dataset.loaded = 'loading';
    const body = details.querySelector('.listing-body');
    const status = document.createElement('p');
    status.className = 'listing-status';
    status.setAttribute('role', 'status');
    status.textContent = 'Loading…';
    body.prepend(status);
    body.setAttribute('aria-busy', 'true');
    try {
      const response = await fetch(details.dataset.src);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const fragment = new DOMParser().parseFromString(await response.text(), 'text/html').querySelector('[data-fragment]');
      if (!fragment) throw new Error('No note in the response');
      body.replaceChildren(document.importNode(fragment, true));
      details.dataset.loaded = 'true';
      window.JehlpUI?.enhance(body);
    } catch {
      delete details.dataset.loaded;
      status.textContent = 'The note did not load. Close and open it to try again, or use the link.';
    } finally {
      body.removeAttribute('aria-busy');
    }
  }

  // toggle does not bubble; a capturing listener sees every disclosure.
  document.addEventListener('toggle', event => {
    if (event.target.matches?.('details[data-src]') && event.target.open) load(event.target);
  }, true);

  // A link to #note opens that note's panel.
  function openFromHash() {
    const target = location.hash ? document.getElementById(decodeURIComponent(location.hash.slice(1))) : null;
    if (!target?.matches('details[data-src]')) return;
    target.open = true;
    target.scrollIntoView({ block: 'start' });
  }
  window.addEventListener('hashchange', openFromHash);
  openFromHash();
})();
