import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		react(),
		svgr({
			include: "**/*.svg",
			svgrOptions: {
				icon: true,
				svgo: false,
				exportType: "default",
			},
		}),
	],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
});
