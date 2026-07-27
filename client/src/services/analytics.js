/**
 * RUNE Privacy-First Telemetry & Analytics Helper
 * Zero-PII event logging for drop reservations, bag additions, and conversion metrics.
 */

export const trackPageView = (path) => {
  if (process.env.NODE_ENV === 'production') {
    // In production, dispatch lightweight telemetry snippet (e.g. Plausible / PostHog)
    window?.plausible?.('pageview', { u: path });
  } else {
    console.log(`[Telemetry] PageView: ${path}`);
  }
};

export const trackEvent = (eventName, props = {}) => {
  if (process.env.NODE_ENV === 'production') {
    window?.plausible?.(eventName, { props });
  } else {
    console.log(`[Telemetry] Event: ${eventName}`, props);
  }
};
