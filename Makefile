all: deps

.PHONY: deps
deps:
	(cd ./web ; yarn install)

.PHONY: build
build:
	(cd ./web ; npm run build)
