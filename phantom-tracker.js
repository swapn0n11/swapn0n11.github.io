/**
 * PhantomTracker v1.0.0
 * Local-first analytics tracker for swapnonil.me
 * Zero external requests. All data stays on device.
 * 
 * Embed: <script src="/phantom-tracker.js" defer></script>
 * 
 * Syncs to PhantomAnalytics dashboard via:
 *   - BroadcastChannel (same-origin real-time)
 *   - localStorage (cross-tab persistence)
 *   - IndexedDB (long-term storage, same DB as dashboard)
 */

(function PhantomTracker() {
  'use strict';

  const VERSION = '1.0.0';
  const DB_NAME = 'PhantomAnalytics';
  const DB_VERSION = 3;
  const CHANNEL_NAME = 'phantom_analytics';
  const LS_KEY = 'phantom_queue';
  const SESSION_KEY = 'phantom_session';
  const SESSION_TTL = 30 * 60 * 1000; // 30 min session window

  // ===== UTILITIES =====
  function nowTs() { return new Date().toISOString(); }
  function today() { return new Date().toISOString().split('T')[0]; }
  function rand() { return Math.random().toString(36).slice(2, 12); }

  function getOrCreateSession() {
    try {
      const raw = sessionStorage.getItem(SESSION_KEY);
      if (raw) {
        const s = JSON.parse(raw);
        if (Date.now() - s.lastActive < SESSION_TTL) {
          s.lastActive = Date.now();
          sessionStorage.setItem(SESSION_KEY, JSON.stringify(s));
          return s.id;
        }
      }
    } catch (_) {}
    const id = rand();
    sessionStorage.setItem(SESSION_KEY, JSON.stringify({ id, lastActive: Date.now(), start: Date.now() }));
    return id;
  }

  function getReferrer() {
    const ref = document.referrer;
    if (!ref) return 'direct';
    const sources = {
      'github.com': 'github',
      'linkedin.com': 'linkedin',
      'twitter.com': 'twitter',
      'x.com': 'twitter',
      'google.com': 'google',
      'google.co': 'google',
      'duckduckgo.com': 'duckduckgo',
      't.co': 'twitter',
    };
    for (const [domain, label] of Object.entries(sources)) {
      if (ref.includes(domain)) return label;
    }
    try {
      return new URL(ref).hostname;
    } catch (_) {
      return 'referral';
    }
  }

  function getUTMSource() {
    const params = new URLSearchParams(window.location.search);
    return params.get('utm_source') || params.get('ref') || null;
  }

  function getDeviceType() {
    const ua = navigator.userAgent;
    if (/Mobi|Android|iPhone/i.test(ua)) return 'mobile';
    if (/iPad|Tablet/i.test(ua)) return 'tablet';
    return 'desktop';
  }

  function getOS() {
    const ua = navigator.userAgent;
    if (ua.includes('Win')) return 'Windows';
    if (ua.includes('Mac')) return 'macOS';
    if (ua.includes('Linux')) return 'Linux';
    if (ua.includes('Android')) return 'Android';
    if (/iPhone|iPad/.test(ua)) return 'iOS';
    return 'Unknown';
  }

  function getCurrentPath() {
    return window.location.pathname || '/';
  }

  // ===== INDEXEDDB =====
  let db = null;

  function openDB() {
    return new Promise((resolve, reject) => {
      if (db) return resolve(db);
      const req = indexedDB.open(DB_NAME, DB_VERSION);
      req.onupgradeneeded = (e) => {
        const d = e.target.result;
        if (!d.objectStoreNames.contains('pageviews')) {
          const pvStore = d.createObjectStore('pageviews', { keyPath: 'id', autoIncrement: true });
          pvStore.createIndex('page', 'page', { unique: false });
          pvStore.createIndex('date', 'date', { unique: false });
        }
        if (!d.objectStoreNames.contains('leads')) {
          d.createObjectStore('leads', { keyPath: 'id', autoIncrement: true });
        }
        if (!d.objectStoreNames.contains('events')) {
          d.createObjectStore('events', { keyPath: 'id', autoIncrement: true });
        }
      };
      req.onsuccess = (e) => { db = e.target.result; resolve(db); };
      req.onerror = () => reject(req.error);
    });
  }

  function dbAdd(store, data) {
    return new Promise((resolve, reject) => {
      const tx = db.transaction([store], 'readwrite');
      const req = tx.objectStore(store).add(data);
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
  }

  // ===== BROADCASTCHANNEL =====
  let channel = null;

  function initChannel() {
    if (!('BroadcastChannel' in window)) return;
    try {
      channel = new BroadcastChannel(CHANNEL_NAME);
    } catch (_) {}
  }

  function broadcast(event) {
    if (!channel) return;
    try { channel.postMessage(event); } catch (_) {}
  }

  // ===== LOCALSTORAGE QUEUE =====
  function flushToLocalStorage(event) {
    try {
      const queue = JSON.parse(localStorage.getItem(LS_KEY) || '[]');
      queue.push(event);
      // Keep max 500 events in LS
      if (queue.length > 500) queue.splice(0, queue.length - 500);
      localStorage.setItem(LS_KEY, JSON.stringify(queue));
    } catch (_) {}
  }

  // ===== CORE TRACK =====
  async function track(type, payload = {}) {
    const session = getOrCreateSession();
    const event = {
      type,
      page: getCurrentPath(),
      source: getUTMSource() || getReferrer(),
      session,
      device: getDeviceType(),
      os: getOS(),
      date: today(),
      ts: nowTs(),
      url: window.location.href,
      title: document.title,
      ...payload,
    };

    // 1. Broadcast to dashboard (real-time, same origin)
    broadcast({ event_type: type, ...event });

    // 2. Write to localStorage queue
    flushToLocalStorage(event);

    // 3. Write to IndexedDB
    try {
      await openDB();
      const store = type === 'pageview' ? 'pageviews' : 'events';
      await dbAdd(store, event);
    } catch (err) {
      console.warn('[PhantomTracker] IndexedDB write failed:', err);
    }
  }

  // ===== PAGE VIEW TRACKING =====
  function trackPageView() {
    track('pageview', {
      referrer: document.referrer || null,
      screenW: window.screen.width,
      screenH: window.screen.height,
    });
  }

  // ===== TIME ON PAGE =====
  let pageStartTime = Date.now();
  let pageHidden = false;

  function trackEngagement() {
    const elapsed = Math.round((Date.now() - pageStartTime) / 1000);
    if (elapsed < 2) return; // ignore instant bounces
    track('engagement', {
      duration_seconds: elapsed,
      page_hidden: pageHidden,
    });
  }

  // ===== OUTBOUND LINK TRACKING =====
  function trackOutboundLinks() {
    document.addEventListener('click', (e) => {
      const anchor = e.target.closest('a');
      if (!anchor) return;
      const href = anchor.getAttribute('href');
      if (!href) return;
      const isExternal = href.startsWith('http') && !href.includes(window.location.hostname);
      if (isExternal) {
        track('outbound_click', { target: href, text: anchor.textContent.trim().slice(0, 60) });
      }
    }, { passive: true });
  }

  // ===== SCROLL DEPTH =====
  let maxScroll = 0;
  let scrollTracked = { 25: false, 50: false, 75: false, 100: false };

  function trackScroll() {
    const pct = Math.round(
      ((window.scrollY + window.innerHeight) / document.documentElement.scrollHeight) * 100
    );
    if (pct > maxScroll) maxScroll = pct;
    for (const milestone of [25, 50, 75, 100]) {
      if (!scrollTracked[milestone] && pct >= milestone) {
        scrollTracked[milestone] = true;
        track('scroll_depth', { depth_pct: milestone });
      }
    }
  }

  // ===== VISIBILITY =====
  function handleVisibility() {
    if (document.hidden) {
      pageHidden = true;
      trackEngagement();
    } else {
      pageStartTime = Date.now();
    }
  }

  // ===== SPA SUPPORT (History API) =====
  function patchHistory() {
    const origPush = history.pushState.bind(history);
    const origReplace = history.replaceState.bind(history);

    history.pushState = (...args) => {
      origPush(...args);
      trackPageView();
    };

    history.replaceState = (...args) => {
      origReplace(...args);
    };

    window.addEventListener('popstate', trackPageView);
  }

  // ===== CONTACT FORM INTERCEPT =====
  // Auto-captures leads from forms with data-phantom="lead"
  function interceptLeadForms() {
    document.addEventListener('submit', async (e) => {
      const form = e.target.closest('form[data-phantom="lead"]');
      if (!form) return;

      const name = form.querySelector('[name="name"],[id*="name"]')?.value?.trim() || 'Anonymous';
      const email = form.querySelector('[type="email"],[name="email"]')?.value?.trim() || '';
      const message = form.querySelector('textarea,[name="message"]')?.value?.trim() || '';
      const subject = form.querySelector('[name="subject"],[id*="subject"]')?.value?.trim() || 'Portfolio Contact';

      if (!email) return;

      try {
        await openDB();
        await dbAdd('leads', { name, email, subject, message, ts: nowTs(), read: false, source: 'contact_form' });
        broadcast({ event_type: 'new_lead', name, email, subject, ts: nowTs() });
        flushToLocalStorage({ type: 'lead', name, email, subject, ts: nowTs() });
      } catch (err) {
        console.warn('[PhantomTracker] Lead capture failed:', err);
      }
    }, { passive: true });
  }

  // ===== INIT =====
  function init() {
    // Don't track in dev/localhost unless forced
    const isLocal = ['localhost', '127.0.0.1', ''].includes(window.location.hostname);
    const forceTrack = window.__PHANTOM_FORCE_TRACK__;
    if (isLocal && !forceTrack) {
      console.log('[PhantomTracker] Localhost detected — tracking disabled. Set window.__PHANTOM_FORCE_TRACK__ = true to override.');
      return;
    }

    initChannel();
    trackPageView();
    trackOutboundLinks();
    interceptLeadForms();
    patchHistory();

    // Scroll depth (throttled)
    let scrollTimer;
    window.addEventListener('scroll', () => {
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(trackScroll, 200);
    }, { passive: true });

    // Engagement on leave
    document.addEventListener('visibilitychange', handleVisibility);
    window.addEventListener('beforeunload', trackEngagement);

    console.log(`[PhantomTracker] v${VERSION} active — local-first, zero telemetry.`);
  }

  // Run after DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Expose public API
  window.PhantomTracker = { track, version: VERSION };

})();
