import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteCommonjs, esbuildCommonjs } from "@originjs/vite-plugin-commonjs";

export default defineConfig({
	plugins: [viteCommonjs(), react()],
	build: {
		outDir: "build",
		manifest: true,
		rollupOptions: {
			// overwrite default .html entry
			input: "/path/to/main.tsx",
		},
	},
	optimizeDeps: {
		esbuildOptions: {
			plugins: [esbuildCommonjs(["react-s3"])],
		},
	},
});
