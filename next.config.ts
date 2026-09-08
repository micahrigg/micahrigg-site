import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // GitHub Pages serves directories, so every route needs its own index.html.
  trailingSlash: true,
  images: { unoptimized: true },
  // Pin the workspace root so a stray parent lockfile can't be inferred instead.
  turbopack: { root: path.join(__dirname) },
};

export default nextConfig;
