# Code generation
.PHONY: code-generate-services
code-generate-services: ## Generate services
	@if [ ! -f $(CURDIR)/.swagger.env ]; then \
		echo "❌ Error: .swagger.env file not found in $(CURDIR)"; \
		exit 1; \
	fi; \
	GO_PATH=$$(grep '^GO_PATH=' $(CURDIR)/.swagger.env | cut -d '=' -f2 | tr -d '"' | tr -d "'"); \
	if [ -z "$$GO_PATH" ]; then \
		echo "❌ Error: GO_PATH not found in .swagger.env"; \
		exit 1; \
	fi; \
	echo "🔨 Running make swagger-docs in $$GO_PATH"; \
	cd "$$GO_PATH" && make swagger-docs; \
	if [ $$? -eq 0 ]; then \
		echo "✅ swagger-docs completed successfully, generating services..."; \
		cd - > /dev/null && bun run generate-services; \
	else \
		echo "❌ Error: make swagger-docs failed"; \
		exit 1; \
	fi



# Capture arguments after target for claude/ralph commands
# Usage: make claude "do this task" or make ralph "implement feature"
ifneq (,$(filter code-claude code-ralph,$(firstword $(MAKECMDGOALS))))
  TASK := $(wordlist 2,$(words $(MAKECMDGOALS)),$(MAKECMDGOALS))
  $(eval $(TASK):;@:)
endif

.PHONY: code-claude
code-claude: ## Create Claude PR - Usage: make code-claude "description"
	@if [ -z "$(TASK)" ]; then \
		echo "❌ Error: TASK is required"; \
		echo "Usage: make claude \"Add user authentication\""; \
		exit 1; \
	fi; \
	BASE_BRANCH=$${BRANCH:-$$(git rev-parse --abbrev-ref HEAD)}; \
	./scripts/claude-pr.sh "$(TASK)" "$$BASE_BRANCH"


.PHONY: code-ralph
code-ralph: ## Create Ralph PR - Usage: make code-ralph "description"
	@if [ -z "$(TASK)" ]; then \
		echo "❌ Error: TASK is required"; \
		echo "Usage: make ralph \"Add user authentication\""; \
		exit 1; \
	fi; \
	BASE_BRANCH=$${BRANCH:-$$(git rev-parse --abbrev-ref HEAD)}; \
	./scripts/ralph-pr.sh "$(TASK)" "$$BASE_BRANCH"