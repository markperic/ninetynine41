import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Sanity Studio (mounted at /studio) bundles `swr`, which ships a
  // "react-server" export condition Next 16's RSC/SSR compiler resolves for
  // any module reachable from a Server Component — but sanity/lib code
  // expects swr's default (client) export, so left un-excluded the build
  // fails with "Export default doesn't exist in target module". Marking
  // these external makes SSR require() them normally instead.
  serverExternalPackages: ["sanity", "@sanity/vision", "styled-components"],
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
    ],
  },
  async redirects() {
    return [
      { source: "/demo", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
