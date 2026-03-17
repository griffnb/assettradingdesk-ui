
.PHONY: clear-node-modules
clear-node-modules: ## Clear node_modules directory
	find . -name "node_modules" -type d -prune -exec rm -rf '{}' +


.PHONY: watch-cf-logs
watch-cf-logs: ## Watch Cloudflare logs
	npx wrangler pages deployment tail

