import * as Sentry from "@sentry/react-native";

let initialized = false;

export function initializeMobileSentry() {
  if (initialized) {
    return;
  }

  if (__DEV__) {
    return;
  }

  const dsn = process.env.EXPO_PUBLIC_SENTRY_DSN;

  if (!dsn) {
    return;
  }

  Sentry.init({
    dsn,
    enabled: true,
  });

  initialized = true;
}

export function captureMobileError(error: unknown) {
  if (!initialized) {
    return;
  }

  Sentry.captureException(error);
}
