// Debug utility for tracking navigation and loading issues
// Add to console: window.debugRouteLoading = true

if (typeof window !== 'undefined') {
  let debugEnabled = false;
  
  Object.defineProperty(window, 'debugRouteLoading', {
    get: () => debugEnabled,
    set: (value: boolean) => {
      debugEnabled = value;
      if (value) {
        console.log('%c[RouteDebug] Debug mode enabled', 'color: #0f0; font-weight: bold');
      } else {
        console.log('%c[RouteDebug] Debug mode disabled', 'color: #f00; font-weight: bold');
      }
    }
  });

  const log = (msg: string, data?: any) => {
    if (debugEnabled) {
      console.log(`%c[RouteDebug] ${msg}`, 'color: #0ff', data || '');
    }
  };

  // Track all route events
  window.addEventListener('route-progress-start', () => {
    log('Progress started', { time: Date.now() });
  });

  window.addEventListener('route-progress-complete', () => {
    log('Progress completed', { time: Date.now() });
  });

  window.addEventListener('route-glitch-start', () => {
    log('Glitch started', { time: Date.now() });
  });

  window.addEventListener('route-glitch-ready', () => {
    log('Glitch ready (route painted)', { time: Date.now() });
  });

  // Track navigation timing
  let navStartTime: number | null = null;
  
  window.addEventListener('route-progress-start', () => {
    navStartTime = Date.now();
  });

  window.addEventListener('route-progress-complete', () => {
    if (navStartTime) {
      const duration = Date.now() - navStartTime;
      log(`Navigation took ${duration}ms`, { duration });
      navStartTime = null;
    }
  });

  // Track failed loads (timeout after 5s)
  let timeoutId: number | null = null;
  
  window.addEventListener('route-progress-start', () => {
    if (timeoutId) window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => {
      console.error('%c[RouteDebug] Navigation timeout - route failed to load after 5s', 'color: #f00; font-weight: bold');
    }, 5000);
  });

  window.addEventListener('route-progress-complete', () => {
    if (timeoutId) {
      window.clearTimeout(timeoutId);
      timeoutId = null;
    }
  });

  log('Debug utility loaded. Set window.debugRouteLoading = true to enable logging');
}

export {};
