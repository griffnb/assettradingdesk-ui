# Atlas-Go Project Makefile
# ---------------------------

# Default shell for executing commands
SHELL := /bin/bash


.PHONY: help
help: ## Show this help message
	@echo 'Usage: make [target]'
	@echo ''
	@echo 'Targets:'
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

# Development targets


.PHONY: techboss
techboss: ## Run development server
	pnpm -F techboss-ai dev --host 0.0.0.0 && open http://local-techboss:5432

.PHONY: ai-dev
ai-dev: ## Run development server
	pnpm -F ai_app dev --host 0.0.0.0 && open http://techboss.localhost:5173

.PHONY: admin
admin: ## Run development server
	@open -a "Google Chrome" http://local-techboss:5433
	pnpm -F admin dev --host 0.0.0.0


# Docker targets
.PHONY: docker-up
docker-up: ## Start Docker services
	docker compose -f infrastructure/docker-compose.yml up


.PHONY: clear-node-modules
clear-node-modules: ## Clear node_modules directory
	find . -name "node_modules" -type d -prune -exec rm -rf '{}' +

.PHONY: watch-cf-logs
watch-cf-logs: ## Watch Cloudflare logs
	npx wrangler pages deployment tail


.PHONY: storybook
storybook: ## Run the storybook
	pnpm -F ui storybook


.PHONY: fix-mismatches
fix-mismatches: ## Fix package versions
	npx syncpack@latest fix-mismatches --types prod,dev

.PHONY: list-mismatches
list-mismatches: ## List package mismatches
	npx syncpack@latest list-mismatches --types prod,dev


.PHONY: add-component
add-component: ## adds one or more shadcn components
	@args="$(filter-out $@,$(MAKECMDGOALS))"; \
	if [ -z "$$args" ]; then \
		echo "Usage: make add-component <component...>"; exit 1; \
	fi; \
	cd packages/ui && pnpm dlx shadcn@latest add $$args

# swallow extra goals so make doesn't complain
%:
	@: