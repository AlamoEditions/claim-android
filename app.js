(() => {
  'use strict';
  const local = ['127.0.0.1', 'localhost', ''].includes(location.hostname);
  const status = document.getElementById('share-status');
  const share = document.getElementById('share');
  const url = share.dataset.url;
  if (local) {
    document.getElementById('preview').hidden = false;
    const download = document.getElementById('download');
    download.setAttribute('aria-disabled', 'true');
    download.removeAttribute('href');
    download.title = 'Le téléchargement sera disponible après publication.';
    document.getElementById('share-link').removeAttribute('href');
    share.disabled = true;
    status.textContent = 'Lien et QR préparés, pas encore actifs.';
    return;
  }
  share.addEventListener('click', async () => {
    status.textContent = '';
    try {
      if (navigator.share) {
        await navigator.share({ title: 'Claim', text: 'Installer ou mettre à jour Claim sur Android', url });
      } else if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(url);
        status.textContent = 'Lien copié. Tu peux le coller dans ton message.';
      } else {
        status.textContent = 'Maintiens le lien ci-dessous pour le copier.';
      }
    } catch (error) {
      if (error.name !== 'AbortError') status.textContent = 'Tu peux copier le lien affiché ci-dessous.';
    }
  });
})();
