# Atlas-Go Project Makefile
# ---------------------------

# Default shell for executing commands
SHELL := /bin/bash


.PHONY: help
help: ## Show this help message
	@echo 'Usage: make [target]'
	@echo ''
	@echo 'Targets:'
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":"}; {target=$$2; sub(/^[[:space:]]*/, "", target); desc=$$3; for(i=4; i<=NF; i++) desc=desc":"$$i; sub(/.*## /, "", desc); printf "\033[36m%-30s\033[0m %s\n", target, desc}'


# Development targets

# Include standard makes
include ./scripts/makes/core.mk

.PHONY: admin
admin: ## Run development server
	@open -a "Google Chrome" http://localhost:5174
	bun -F admin dev --host 0.0.0.0

.PHONY: customer
customer: ## Run development server
	@open -a "Google Chrome" http://localhost:5173
	bun -F customer dev --host 0.0.0.0



.PHONY: storybook
storybook: ## Run the storybook
	bun -F ui storybook




#CKB targets
.PHONY: ckb-reindex
ckb-reindex: ## Reindex CKB data
	@npx @tastehub/ckb status
	@npx @tastehub/ckb index

.PHONY: ckb-start
ckb-start: ## Start CKB node
	@npx @tastehub/ckb daemon start

