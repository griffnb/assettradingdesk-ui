.PHONY: core-sync
core-sync: ## sync custom core packages with shadcn_builder
	@echo "Syncing custom core packages"
	@GITHUB_TOKEN=$$(gh auth token) shadcn_builder add -all
	@for dir in $(CURDIR)/packages/*/; do \
		if [ -d "$$dir" ] && [ -f "$$dir/components.json" ]; then \
			echo "Building registry in $$dir"; \
			(cd "$$dir" && GITHUB_TOKEN=$$(gh auth token) shadcn_builder add -all); \
		fi; \
	done

.PHONY: core-sync-force
core-sync-force: ## sync custom core packages with shadcn_builder
	@echo "Syncing custom core packages"
	@GITHUB_TOKEN=$$(gh auth token) shadcn_builder add -all -force || true
	@for dir in $(CURDIR)/packages/*/; do \
		if [ -d "$$dir" ] && [ -f "$$dir/components.json" ]; then \
			echo "Building registry in $$dir"; \
			(cd "$$dir" && GITHUB_TOKEN=$$(gh auth token) shadcn_builder add -all -force) || true; \
		fi; \
	done

.PHONY: core-check
core-check: ## check custom core packages with shadcn_builder
	@echo "Checking core packages"
	@GITHUB_TOKEN=$$(gh auth token) shadcn_builder check -all || true
	@for dir in $(CURDIR)/packages/*/; do \
		if [ -d "$$dir" ] && [ -f "$$dir/components.json" ]; then \
			echo "Building registry in $$dir"; \
			(cd "$$dir" && GITHUB_TOKEN=$$(gh auth token) shadcn_builder check -all) || true; \
		fi; \
	done
	