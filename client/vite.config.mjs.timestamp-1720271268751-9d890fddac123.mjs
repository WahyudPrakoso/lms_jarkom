// vite.config.mjs
import { defineConfig, loadEnv } from "file:///D:/node.js/Edu-Hub-master%20-%20mysql/client/node_modules/vite/dist/node/index.js";
import react from "file:///D:/node.js/Edu-Hub-master%20-%20mysql/client/node_modules/@vitejs/plugin-react/dist/index.mjs";
import path from "node:path";
import autoprefixer from "file:///D:/node.js/Edu-Hub-master%20-%20mysql/client/node_modules/autoprefixer/lib/autoprefixer.js";
var __vite_injected_original_dirname = "D:\\node.js\\Edu-Hub-master - mysql\\client";
var vite_config_default = defineConfig(() => {
  return {
    // define:{
    //   'process.env': env
    // },
    base: "./",
    build: {
      outDir: "build"
    },
    css: {
      postcss: {
        plugins: [
          autoprefixer({})
          // add options if needed
        ]
      }
    },
    esbuild: {
      loader: "jsx",
      include: /src\/.*\.jsx?$/,
      exclude: []
    },
    optimizeDeps: {
      force: true,
      esbuildOptions: {
        loader: {
          ".js": "jsx"
        }
      }
    },
    plugins: [react()],
    resolve: {
      alias: [
        {
          find: "src/",
          replacement: `${path.resolve(__vite_injected_original_dirname, "src")}/`
        }
      ],
      extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".scss"]
    },
    server: {
      port: 3e3,
      proxy: {
        // https://vitejs.dev/config/server-options.html
      }
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcubWpzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDpcXFxcbm9kZS5qc1xcXFxFZHUtSHViLW1hc3RlciAtIG15c3FsXFxcXGNsaWVudFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcbm9kZS5qc1xcXFxFZHUtSHViLW1hc3RlciAtIG15c3FsXFxcXGNsaWVudFxcXFx2aXRlLmNvbmZpZy5tanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L25vZGUuanMvRWR1LUh1Yi1tYXN0ZXIlMjAtJTIwbXlzcWwvY2xpZW50L3ZpdGUuY29uZmlnLm1qc1wiO2ltcG9ydCB7IGRlZmluZUNvbmZpZywgbG9hZEVudiB9IGZyb20gJ3ZpdGUnXG5pbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3QnXG5pbXBvcnQgcGF0aCBmcm9tICdub2RlOnBhdGgnXG5pbXBvcnQgYXV0b3ByZWZpeGVyIGZyb20gJ2F1dG9wcmVmaXhlcidcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKCgpID0+IHtcbiAgLy8gY29uc3QgZW52ID0gbG9hZEVudihtb2RlLHByb2Nlc3MuY3dkKCksJycpO1xuICByZXR1cm4ge1xuICAgIC8vIGRlZmluZTp7XG4gICAgLy8gICAncHJvY2Vzcy5lbnYnOiBlbnZcbiAgICAvLyB9LFxuICAgIGJhc2U6ICcuLycsXG4gICAgYnVpbGQ6IHtcbiAgICAgIG91dERpcjogJ2J1aWxkJyxcbiAgICB9LFxuICAgIGNzczoge1xuICAgICAgcG9zdGNzczoge1xuICAgICAgICBwbHVnaW5zOiBbXG4gICAgICAgICAgYXV0b3ByZWZpeGVyKHt9KSwgLy8gYWRkIG9wdGlvbnMgaWYgbmVlZGVkXG4gICAgICAgIF0sXG4gICAgICB9LFxuICAgIH0sXG4gICAgZXNidWlsZDoge1xuICAgICAgbG9hZGVyOiAnanN4JyxcbiAgICAgIGluY2x1ZGU6IC9zcmNcXC8uKlxcLmpzeD8kLyxcbiAgICAgIGV4Y2x1ZGU6IFtdLFxuICAgIH0sXG4gICAgb3B0aW1pemVEZXBzOiB7XG4gICAgICBmb3JjZTogdHJ1ZSxcbiAgICAgIGVzYnVpbGRPcHRpb25zOiB7XG4gICAgICAgIGxvYWRlcjoge1xuICAgICAgICAgICcuanMnOiAnanN4JyxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICBwbHVnaW5zOiBbcmVhY3QoKV0sXG4gICAgcmVzb2x2ZToge1xuICAgICAgYWxpYXM6IFtcbiAgICAgICAge1xuICAgICAgICAgIGZpbmQ6ICdzcmMvJyxcbiAgICAgICAgICByZXBsYWNlbWVudDogYCR7cGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ3NyYycpfS9gLFxuICAgICAgICB9LFxuICAgICAgXSxcbiAgICAgIGV4dGVuc2lvbnM6IFsnLm1qcycsICcuanMnLCAnLnRzJywgJy5qc3gnLCAnLnRzeCcsICcuanNvbicsICcuc2NzcyddLFxuICAgIH0sXG4gICAgc2VydmVyOiB7XG4gICAgICBwb3J0OiAzMDAwLFxuICAgICAgcHJveHk6IHtcbiAgICAgICAgLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9zZXJ2ZXItb3B0aW9ucy5odG1sXG4gICAgICB9LFxuICAgIH0sXG4gIH1cbn0pXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXdULFNBQVMsY0FBYyxlQUFlO0FBQzlWLE9BQU8sV0FBVztBQUNsQixPQUFPLFVBQVU7QUFDakIsT0FBTyxrQkFBa0I7QUFIekIsSUFBTSxtQ0FBbUM7QUFLekMsSUFBTyxzQkFBUSxhQUFhLE1BQU07QUFFaEMsU0FBTztBQUFBO0FBQUE7QUFBQTtBQUFBLElBSUwsTUFBTTtBQUFBLElBQ04sT0FBTztBQUFBLE1BQ0wsUUFBUTtBQUFBLElBQ1Y7QUFBQSxJQUNBLEtBQUs7QUFBQSxNQUNILFNBQVM7QUFBQSxRQUNQLFNBQVM7QUFBQSxVQUNQLGFBQWEsQ0FBQyxDQUFDO0FBQUE7QUFBQSxRQUNqQjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsSUFDQSxTQUFTO0FBQUEsTUFDUCxRQUFRO0FBQUEsTUFDUixTQUFTO0FBQUEsTUFDVCxTQUFTLENBQUM7QUFBQSxJQUNaO0FBQUEsSUFDQSxjQUFjO0FBQUEsTUFDWixPQUFPO0FBQUEsTUFDUCxnQkFBZ0I7QUFBQSxRQUNkLFFBQVE7QUFBQSxVQUNOLE9BQU87QUFBQSxRQUNUO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxJQUNBLFNBQVMsQ0FBQyxNQUFNLENBQUM7QUFBQSxJQUNqQixTQUFTO0FBQUEsTUFDUCxPQUFPO0FBQUEsUUFDTDtBQUFBLFVBQ0UsTUFBTTtBQUFBLFVBQ04sYUFBYSxHQUFHLEtBQUssUUFBUSxrQ0FBVyxLQUFLLENBQUM7QUFBQSxRQUNoRDtBQUFBLE1BQ0Y7QUFBQSxNQUNBLFlBQVksQ0FBQyxRQUFRLE9BQU8sT0FBTyxRQUFRLFFBQVEsU0FBUyxPQUFPO0FBQUEsSUFDckU7QUFBQSxJQUNBLFFBQVE7QUFBQSxNQUNOLE1BQU07QUFBQSxNQUNOLE9BQU87QUFBQTtBQUFBLE1BRVA7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
