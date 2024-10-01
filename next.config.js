/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

import { withSentryConfig } from "@sentry/nextjs";
import Icons from "unplugin-icons/webpack";
import { env } from "./src/env.js";

/** @type {import("next").NextConfig} */
const config = {
  poweredByHeader: false,
  output: "standalone",
  webpack(config) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    config.plugins.push(
      Icons({
        compiler: "jsx",
        jsx: "react",
        autoInstall: true,
      }),
    );

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return config;
  },
  async rewrites() {
    return [
      {
        source: "/_carrier/seele/static/:path*",
        destination: "https://us-assets.i.posthog.com/static/:path*",
      },
      {
        source: "/_carrier/seele/:path*",
        destination: "https://us.i.posthog.com/:path*",
      },
      {
        source: "/_carrier/seele/decide",
        destination: "https://us.i.posthog.com/decide",
      },
    ];
  },
  // This is required to support PostHog trailing slash API requests
  skipTrailingSlashRedirect: true,
};

export default withSentryConfig(config, {
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options

  org: "ekakeru",
  project: "ekakeru",

  silent: !process.env.CI,

  release: {
    create: true,
    finalize: true,
    name: `ekakeru@${process.env.VERSION}`,
    deploy: {
      env: process.env.NODE_ENV,
    },
  },

  sourcemaps: {
    deleteSourcemapsAfterUpload: true,
  },

  authToken: env.SENTRY_AUTH_TOKEN,

  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  // Automatically annotate React components to show their full name in breadcrumbs and session replay
  reactComponentAnnotation: {
    enabled: true,
  },

  // Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
  // This can increase your server load as well as your hosting bill.
  // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
  // side errors will fail.
  tunnelRoute: "/_carrier/nerv",

  // Hides source maps from generated client bundles
  hideSourceMaps: true,

  // Automatically tree-shake Sentry logger statements to reduce bundle size
  disableLogger: true,

  // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
  // See the following for more information:
  // https://docs.sentry.io/product/crons/
  // https://vercel.com/docs/cron-jobs
  automaticVercelMonitors: true,

  telemetry: false,
});
