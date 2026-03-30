import { PostHog } from "posthog-react-native";

let client: PostHog | null = null;

export function initializeMobileAnalytics() {
  if (client) {
    return client;
  }

  if (__DEV__) {
    return null;
  }

  const apiKey = process.env.EXPO_PUBLIC_POSTHOG_KEY;

  if (!apiKey) {
    return null;
  }

  client = new PostHog(apiKey, {
    host: process.env.EXPO_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com",
  });

  return client;
}

export async function trackMobileEvent(
  event: string,
  properties?: Record<string, string | number | boolean | null | undefined>,
) {
  const analytics = initializeMobileAnalytics();

  if (!analytics) {
    return;
  }

  const payload = properties
    ? (Object.fromEntries(
        Object.entries(properties).filter(([, value]) => value !== undefined),
      ) as Record<string, string | number | boolean | null>)
    : undefined;

  await analytics.capture(event, payload);
}
