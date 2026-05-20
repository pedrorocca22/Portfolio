/* ─── tracker.js ─────────────────────────────────────────────────────────────
   Portfolio — Custom Lightweight Visitor Traceability Tracker
   ─────────────────────────────────────────────────────────────────────────── */

(function initTracker() {
  // Wait for Firebase to be initialized
  const checkFirebaseInterval = setInterval(() => {
    if (typeof db !== 'undefined' && typeof firebase !== 'undefined') {
      clearInterval(checkFirebaseInterval);
      runTracker();
    }
  }, 100);

  function runTracker() {
    // 1. Check if we already have a session ID
    let visitDocId = sessionStorage.getItem('visitDocId');
    let activeSeconds = parseInt(sessionStorage.getItem('visitDuration') || '0', 10);

    // Track active seconds locally
    setInterval(() => {
      activeSeconds += 1;
      sessionStorage.setItem('visitDuration', activeSeconds);
    }, 1000);

    if (visitDocId) {
      // Session already exists, resume updating duration
      startDurationReporting(visitDocId);
    } else {
      // New session: extract referral parameter and log visit
      const urlParams = new URLSearchParams(window.location.search);
      const ref = urlParams.get('ref') || 'direct';

      // Parse user agent basics
      const ua = navigator.userAgent;
      let browser = 'Other';
      if (ua.indexOf('Chrome') > -1) browser = 'Chrome';
      else if (ua.indexOf('Safari') > -1) browser = 'Safari';
      else if (ua.indexOf('Firefox') > -1) browser = 'Firefox';
      else if (ua.indexOf('Edge') > -1) browser = 'Edge';

      let platform = 'Unknown';
      if (navigator.userAgentData && navigator.userAgentData.platform) {
        platform = navigator.userAgentData.platform;
      } else if (navigator.platform) {
        platform = navigator.platform;
      }

      const visitData = {
        referrer: ref,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        path: window.location.pathname || '/',
        device: {
          browser: browser,
          platform: platform,
          screen: `${window.screen.width}x${window.screen.height}`,
          language: navigator.language || 'es'
        },
        geo: {
          country: 'Cargando...',
          city: 'Cargando...',
          ip: ''
        },
        duration: 0
      };

      // Write to Firestore
      db.collection('visits').add(visitData)
        .then(docRef => {
          visitDocId = docRef.id;
          sessionStorage.setItem('visitDocId', visitDocId);
          
          startDurationReporting(visitDocId);
          fetchGeoDetails(visitDocId);
        })
        .catch(err => {
          console.warn("Custom Analytics: Error logging visit. Checking security rules.", err);
        });
    }

    // Reports active time spent back to Firestore
    function startDurationReporting(docId) {
      // Periodic report every 15s
      setInterval(() => {
        db.collection('visits').doc(docId).update({
          duration: activeSeconds
        }).catch(err => {});
      }, 15000);

      // Final report on close/exit
      const reportFinal = () => {
        db.collection('visits').doc(docId).update({
          duration: activeSeconds
        }).catch(err => {});
      };

      window.addEventListener('beforeunload', reportFinal);
      window.addEventListener('pagehide', reportFinal);
    }

    // Fetches location data non-blockingly and fails silently if blocked
    function fetchGeoDetails(docId) {
      fetch('https://ipapi.co/json/')
        .then(res => {
          if (!res.ok) throw new Error("Rate limit or error");
          return res.json();
        })
        .then(data => {
          db.collection('visits').doc(docId).update({
            geo: {
              country: data.country_name || 'Desconocido',
              city: data.city || 'Desconocido',
              ip: data.ip ? data.ip.replace(/\.\d+\.\d+$/, '.xx.xx') : '' // Mask IP slightly for basic privacy
            }
          }).catch(err => {});
        })
        .catch(err => {
          // Fallback if API blocked
          db.collection('visits').doc(docId).update({
            geo: {
              country: 'Bloqueado/Desconocido',
              city: 'Bloqueado/Desconocido',
              ip: ''
            }
          }).catch(err => {});
        });
    }
  }
})();
