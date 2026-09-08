import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Sanity Studio (mounted at /studio) bundles `swr`, which ships a
  // "react-server" export condition Next 16's RSC/SSR compiler resolves for
  // any module reachable from a Server Component — but sanity/lib code
  // expects swr's default (client) export, so left un-aliased the build
  // fails with "Export default doesn't exist in target module". Pointing
  // the bare specifier straight at swr's default entry file skips the
  // conditional-exports lookup entirely. (Previously "sanity" itself was
  // marked serverExternalPackages instead, which fixed that build error but
  // broke Studio at runtime: externalizing forces Node's plain require() to
  // resolve sanity's own "react" import outside Next's bundler, giving it a
  // different React module instance than the one Next's SSR pipeline sets
  // its compiled-output dispatcher on — every useMemoCache() call inside
  // Sanity's React-Compiler-precompiled components then hits a null
  // dispatcher. See https://github.com/sanity-io/sanity/issues/8235.)
  turbopack: {
    resolveAlias: {
      swr: "swr/dist/index/index.mjs",
    },
  },
  // The on-screen dev-tools badge only ever renders in `next dev`, never in a
  // production build, but it floats over the corner of full-bleed hero sections
  // and gets mistaken for site chrome during design review. Compile and runtime
  // errors are still surfaced with this off.
  devIndicators: false,
  images: {
    // Every module image is a local file in public/images/library/ now, so
    // no placeholder photo host needs listing here. YouTube's thumbnail CDN
    // is the one remote source still in use, for module 29's video embed.
    remotePatterns: [
      { protocol: "https", hostname: "img.youtube.com", pathname: "/vi/**" },
      { protocol: "https", hostname: "cdn.sanity.io", pathname: "/images/**" },
      // Shop2Give product photos are hosted by Medusa itself (a Railway
      // Volume behind /static — see medusa-config.ts in the Medusa repo).
      { protocol: "https", hostname: "backend-production-fb4ea.up.railway.app", pathname: "/static/**" },
    ],
  },
  async redirects() {
    return [
      { source: "/demo", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
