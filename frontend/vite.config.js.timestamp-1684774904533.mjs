// vite.config.js
import { defineConfig } from "file:///C:/Users/nnast/PycharmProjects/smart/frontend/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/nnast/PycharmProjects/smart/frontend/node_modules/@vitejs/plugin-react/dist/index.mjs";
var vite_config_default = defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true
    },
    host: true,
    // needed for the Docker Container port mapping to work
    strictPort: true,
    port: 5173
    // you can replace this port with any port
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxubmFzdFxcXFxQeWNoYXJtUHJvamVjdHNcXFxcc21hcnRcXFxcZnJvbnRlbmRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXG5uYXN0XFxcXFB5Y2hhcm1Qcm9qZWN0c1xcXFxzbWFydFxcXFxmcm9udGVuZFxcXFx2aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvbm5hc3QvUHljaGFybVByb2plY3RzL3NtYXJ0L2Zyb250ZW5kL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHtkZWZpbmVDb25maWd9IGZyb20gJ3ZpdGUnXHJcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCdcclxuXHJcbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcbiAgICBwbHVnaW5zOiBbcmVhY3QoKV0sXHJcbiAgICBzZXJ2ZXI6IHtcclxuICAgICAgICB3YXRjaDoge1xyXG4gICAgICAgICAgICB1c2VQb2xsaW5nOiB0cnVlLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgaG9zdDogdHJ1ZSwgLy8gbmVlZGVkIGZvciB0aGUgRG9ja2VyIENvbnRhaW5lciBwb3J0IG1hcHBpbmcgdG8gd29ya1xyXG4gICAgICAgIHN0cmljdFBvcnQ6IHRydWUsXHJcbiAgICAgICAgcG9ydDogNTE3MywgLy8geW91IGNhbiByZXBsYWNlIHRoaXMgcG9ydCB3aXRoIGFueSBwb3J0XHJcbiAgICB9XHJcblxyXG59KVxyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXFVLFNBQVEsb0JBQW1CO0FBQ2hXLE9BQU8sV0FBVztBQUdsQixJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUN4QixTQUFTLENBQUMsTUFBTSxDQUFDO0FBQUEsRUFDakIsUUFBUTtBQUFBLElBQ0osT0FBTztBQUFBLE1BQ0gsWUFBWTtBQUFBLElBQ2hCO0FBQUEsSUFDQSxNQUFNO0FBQUE7QUFBQSxJQUNOLFlBQVk7QUFBQSxJQUNaLE1BQU07QUFBQTtBQUFBLEVBQ1Y7QUFFSixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
