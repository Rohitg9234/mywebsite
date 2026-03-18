// Meta Pixel bootstrap with runtime ID (static hosting friendly).
// Reads pixel id from /meta_pixel_id.txt and initializes fbq.

function initMetaPixel(pixelId) {
  if (!pixelId || typeof pixelId !== 'string') return false;
  const raw = pixelId.trim();

  // Support either:
  // - ID-only file: "1234567890"
  // - Full snippet file (extract the first long digit sequence)
  let id = raw;
  if (!/^\d{6,20}$/.test(id)) {
    const match = raw.match(/\b(\d{6,20})\b/);
    id = match ? match[1] : '';
  }
  if (!/^\d{6,20}$/.test(id)) return false;

  // Standard Meta Pixel base code (slightly adapted to accept runtime id)
  /* eslint-disable */
  !(function (f, b, e, v, n, t, s) {
    if (f.fbq) return;
    n = (f.fbq = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    });
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = !0;
    n.version = '2.0';
    n.queue = [];
    t = b.createElement(e);
    t.async = !0;
    t.src = v;
    s = b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t, s);
  })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
  /* eslint-enable */

  window.fbq('init', id);
  window.fbq('track', 'PageView');
  return true;
}

async function initMetaPixelFromFile() {
  try {
    const res = await fetch('/meta_pixel_id.txt', { cache: 'no-cache' });
    if (!res.ok) return false;
    const text = await res.text();
    if (!text) return false;
    if (text.includes('PASTE_YOUR_META_PIXEL_ID_HERE')) return false;
    return initMetaPixel(text);
  } catch (_) {
    return false;
  }
}

// Auto-init when included.
initMetaPixelFromFile();

