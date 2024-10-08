// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import { env } from "@/env";
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://fee5cfd9322b1125d704fb6b8241735e@o4508033850998784.ingest.us.sentry.io/4508033876688896",

  release: `ekakeru@${process.env.VERSION}`,
  environment: env.NODE_ENV,

  enabled: env.NODE_ENV !== "development",

  // Define how likely traces are sampled. Adjust this value in production, or use tracesSampler for greater control.
  tracesSampleRate: 1,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,

  // Add beforeSend function to remove Ssl-Client-Cert header
  beforeSend(event) {
    if (event.request?.headers) {
      delete event.request.headers["ssl-client-cert"];
    }
    return event;
  },
});
