# jam-statz monorepo
#
# frontend: sveltekit app (frontend/)

FRONTEND_DIR ?= frontend

.PHONY: help
help: ## show available targets
	@grep -E '^[a-zA-Z0-9_-]+:.*## ' $(MAKEFILE_LIST) \
		| awk 'BEGIN {FS = ":.*## "}; {printf "  \033[36m%-16s\033[0m %s\n", $$1, $$2}'

## ---------------------------------------------------------------------------
## install / setup
## ---------------------------------------------------------------------------

.PHONY: install
install: ## install frontend (npm) dependencies
	cd $(FRONTEND_DIR) && npm install

## ---------------------------------------------------------------------------
## development servers
## ---------------------------------------------------------------------------

.PHONY: dev
dev: ## run frontend dev server
	cd $(FRONTEND_DIR) && npm run dev

.PHONY: preview
preview: build-frontend ## build + preview the production frontend
	cd $(FRONTEND_DIR) && npm run preview

## ---------------------------------------------------------------------------
## build
## ---------------------------------------------------------------------------

.PHONY: build
build: build-frontend ## build the frontend

.PHONY: build-frontend
build-frontend: ## build the sveltekit frontend
	cd $(FRONTEND_DIR) && npm run build

## ---------------------------------------------------------------------------
## test / lint / format
## ---------------------------------------------------------------------------

.PHONY: test
test: test-frontend ## run all tests

.PHONY: test-frontend
test-frontend: ## compile-check the frontend (no js test suite yet)
	cd $(FRONTEND_DIR) && npm run build

.PHONY: lint
lint: lint-frontend ## run all linters

.PHONY: lint-frontend
lint-frontend: ## prettier check
	cd $(FRONTEND_DIR) && npx prettier --ignore-path ../.prettierignore --check .

.PHONY: format
format: ## write-format everything
	cd $(FRONTEND_DIR) && npx prettier --ignore-path ../.prettierignore --write .

.PHONY: format-check
format-check: ## verify formatting (exit 1 if dirty)
	cd $(FRONTEND_DIR) && npx prettier --ignore-path ../.prettierignore --check .

.PHONY: check
check: lint format-check test ## everything CI would run

## ---------------------------------------------------------------------------
## clean
## ---------------------------------------------------------------------------

.PHONY: clean
clean: clean-frontend ## remove build outputs + caches (keeps node_modules)

.PHONY: clean-frontend
clean-frontend: ## remove frontend build outputs + vite/sveltekit caches
	rm -rf $(FRONTEND_DIR)/.svelte-kit
	rm -rf $(FRONTEND_DIR)/build
	rm -rf $(FRONTEND_DIR)/.vite
	rm -rf $(FRONTEND_DIR)/node_modules/.vite
	rm -rf $(FRONTEND_DIR)/node_modules/.cache

.PHONY: clean-deps
clean-deps: ## remove node_modules (reinstall with `make install`)
	rm -rf $(FRONTEND_DIR)/node_modules

.PHONY: clean-all
clean-all: clean clean-deps ## full clean: outputs, caches, and node_modules
