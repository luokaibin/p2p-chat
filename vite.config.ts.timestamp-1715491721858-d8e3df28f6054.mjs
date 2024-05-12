// vite.config.ts
import { defineConfig } from "file:///home/luokaibin/p2p-chat/node_modules/.pnpm/vite@5.2.11_@types+node@20.12.11/node_modules/vite/dist/node/index.js";
import react from "file:///home/luokaibin/p2p-chat/node_modules/.pnpm/@vitejs+plugin-react-swc@3.6.0_vite@5.2.11/node_modules/@vitejs/plugin-react-swc/index.mjs";
import { resolve } from "path";
import svgr from "file:///home/luokaibin/p2p-chat/node_modules/.pnpm/vite-plugin-svgr@4.2.0_typescript@5.4.5_vite@5.2.11/node_modules/vite-plugin-svgr/dist/index.js";
var __vite_injected_original_dirname = "/home/luokaibin/p2p-chat";
var vite_config_default = defineConfig({
  plugins: [react(), svgr({
    include: "**/*.svg?react"
  })],
  resolve: {
    alias: {
      "@pages": resolve(__vite_injected_original_dirname, "src/pages"),
      "@components": resolve(__vite_injected_original_dirname, "src/components"),
      "cn": resolve(__vite_injected_original_dirname, "src/plugins/cn.ts"),
      "@global": resolve(__vite_injected_original_dirname, "src/global"),
      "@icons": resolve(__vite_injected_original_dirname, "src/icons"),
      "@plugins": resolve(__vite_injected_original_dirname, "src/plugins")
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9sdW9rYWliaW4vcDJwLWNoYXRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9ob21lL2x1b2thaWJpbi9wMnAtY2hhdC92aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vaG9tZS9sdW9rYWliaW4vcDJwLWNoYXQvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0LXN3YydcbmltcG9ydCB7cmVzb2x2ZX0gZnJvbSAncGF0aCdcbmltcG9ydCBzdmdyIGZyb20gJ3ZpdGUtcGx1Z2luLXN2Z3InXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW3JlYWN0KCksIHN2Z3Ioe1xuICAgIGluY2x1ZGU6IFwiKiovKi5zdmc/cmVhY3RcIlxuICB9KV0sXG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczoge1xuICAgICAgJ0BwYWdlcyc6IHJlc29sdmUoX19kaXJuYW1lLCAnc3JjL3BhZ2VzJyksXG4gICAgICAnQGNvbXBvbmVudHMnOiByZXNvbHZlKF9fZGlybmFtZSwgJ3NyYy9jb21wb25lbnRzJyksXG4gICAgICAnY24nOiByZXNvbHZlKF9fZGlybmFtZSwgJ3NyYy9wbHVnaW5zL2NuLnRzJyksXG4gICAgICAnQGdsb2JhbCc6IHJlc29sdmUoX19kaXJuYW1lLCAnc3JjL2dsb2JhbCcpLFxuICAgICAgJ0BpY29ucyc6IHJlc29sdmUoX19kaXJuYW1lLCAnc3JjL2ljb25zJyksXG4gICAgICAnQHBsdWdpbnMnOiByZXNvbHZlKF9fZGlybmFtZSwgJ3NyYy9wbHVnaW5zJyksXG4gICAgfVxuICB9XG59KVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUEwUCxTQUFTLG9CQUFvQjtBQUN2UixPQUFPLFdBQVc7QUFDbEIsU0FBUSxlQUFjO0FBQ3RCLE9BQU8sVUFBVTtBQUhqQixJQUFNLG1DQUFtQztBQUt6QyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTLENBQUMsTUFBTSxHQUFHLEtBQUs7QUFBQSxJQUN0QixTQUFTO0FBQUEsRUFDWCxDQUFDLENBQUM7QUFBQSxFQUNGLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLFVBQVUsUUFBUSxrQ0FBVyxXQUFXO0FBQUEsTUFDeEMsZUFBZSxRQUFRLGtDQUFXLGdCQUFnQjtBQUFBLE1BQ2xELE1BQU0sUUFBUSxrQ0FBVyxtQkFBbUI7QUFBQSxNQUM1QyxXQUFXLFFBQVEsa0NBQVcsWUFBWTtBQUFBLE1BQzFDLFVBQVUsUUFBUSxrQ0FBVyxXQUFXO0FBQUEsTUFDeEMsWUFBWSxRQUFRLGtDQUFXLGFBQWE7QUFBQSxJQUM5QztBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
