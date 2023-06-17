import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		exclude: [".git", "node_modules", "dist"],
	},
});
