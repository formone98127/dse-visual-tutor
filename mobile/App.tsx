import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { WebView } from 'react-native-webview';
import Constants from 'expo-constants';

/**
 * Phone app = thin shell around the SAME website as the web tutor.
 * Content always lives in the web project (`src/data/*`).
 * After you push to main, GitHub Pages updates → every phone sees the new lessons.
 */
const PRODUCTION_TUTOR_URL = 'https://formone98127.github.io/dse-visual-tutor/';

function resolveBaseTutorUrl(): string {
  const extra = Constants.expoConfig?.extra ?? {};
  // Local / Expo Go: set extra.tutorUrlDev to your PC Wi‑Fi URL, e.g. http://192.168.31.218:5173/
  if (__DEV__) {
    const dev = extra.tutorUrlDev;
    if (typeof dev === 'string' && dev.trim()) return ensureSlash(dev.trim());
  }
  const fromExtra = extra.tutorUrl;
  if (typeof fromExtra === 'string' && fromExtra.trim()) {
    return ensureSlash(fromExtra.trim());
  }
  return ensureSlash(PRODUCTION_TUTOR_URL);
}

function ensureSlash(url: string): string {
  return url.endsWith('/') ? url : `${url}/`;
}

function withCacheBust(base: string, version: string): string {
  const join = base.includes('?') ? '&' : '?';
  return `${base}${join}v=${encodeURIComponent(version)}`;
}

export default function App() {
  const baseUrl = useMemo(() => resolveBaseTutorUrl(), []);
  const [tutorUrl, setTutorUrl] = useState(() =>
    withCacheBust(baseUrl, String(Date.now())),
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Ask the live site which lesson pack it is — then open with that stamp (no stale cache).
  useEffect(() => {
    let cancelled = false;
    const stampUrl = `${baseUrl}content-version.json?t=${Date.now()}`;
    fetch(stampUrl)
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error('no version'))))
      .then((j: { version?: string; stamp?: string }) => {
        if (cancelled) return;
        const v = j.version || j.stamp || String(Date.now());
        setTutorUrl(withCacheBust(baseUrl, v));
      })
      .catch(() => {
        if (!cancelled) setTutorUrl(withCacheBust(baseUrl, String(Date.now())));
      });
    return () => {
      cancelled = true;
    };
  }, [baseUrl]);

  const onLoadStart = useCallback(() => {
    setLoading(true);
    setError(null);
  }, []);

  const onLoadEnd = useCallback(() => {
    setLoading(false);
  }, []);

  const onError = useCallback(
    (event: { nativeEvent?: { description?: string; code?: number } }) => {
      const description =
        event?.nativeEvent?.description || 'Could not open the tutor page';
      setLoading(false);
      setError(description);
    },
    [],
  );

  const onHttpError = useCallback(
    (event: { nativeEvent?: { statusCode?: number; url?: string } }) => {
      const statusCode = event?.nativeEvent?.statusCode;
      setError(`Page error (code ${statusCode ?? '?'})`);
      setLoading(false);
    },
    [],
  );

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" />
      {error ? (
        <View style={styles.errorBox}>
          <Text style={styles.errorTitle}>Can't reach the tutor yet</Text>
          <Text style={styles.errorBody}>
            The app couldn't open:{'\n'}
            {tutorUrl}
          </Text>
          <Text style={styles.errorHint}>
            Check your internet connection, then close and reopen the app.
            {'\n'}
            Web and app share one site — after a website update, reopen the app
            to load the new lessons.
          </Text>
          <Text style={styles.errorDetail}>{error}</Text>
        </View>
      ) : (
        <WebView
          style={styles.webview}
          source={{ uri: tutorUrl }}
          originWhitelist={['https://*', 'http://*']}
          allowsBackForwardNavigationGestures
          allowsInlineMediaPlayback
          setSupportMultipleWindows={false}
          // Do not keep an old offline copy of lessons
          cacheEnabled={false}
          incognito
          onLoadStart={onLoadStart}
          onLoadEnd={onLoadEnd}
          onError={onError}
          onHttpError={onHttpError}
        />
      )}
      {loading && !error ? (
        <View style={styles.loadingOverlay} pointerEvents="none">
          <ActivityIndicator size="large" color="#0f766e" />
          <Text style={styles.loadingText}>Opening tutor…</Text>
        </View>
      ) : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#f8fafc',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight ?? 0 : 0,
  },
  webview: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(248,250,252,0.72)',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#334155',
  },
  errorBox: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    gap: 12,
  },
  errorTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#0f172a',
  },
  errorBody: {
    fontSize: 16,
    lineHeight: 24,
    color: '#334155',
  },
  errorHint: {
    fontSize: 15,
    lineHeight: 22,
    color: '#475569',
  },
  errorDetail: {
    marginTop: 8,
    fontSize: 13,
    color: '#94a3b8',
  },
});
