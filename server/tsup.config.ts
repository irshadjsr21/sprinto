import { defineConfig } from "tsup";
import graphqlLoaderPlugin from "@luckycatfactory/esbuild-graphql-loader";

export default defineConfig({
  entry: ["src", "!src/**/__tests__/**", "!src/**/*.test.*"],
  splitting: false,
  sourcemap: true,
  clean: true,
  esbuildPlugins: [(graphqlLoaderPlugin as any).default()],
});
