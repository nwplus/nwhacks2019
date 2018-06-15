all: deps

###############################
#    Project-wide commands    #
###############################

.PHONY: deps
deps:
	(cd ./web ; yarn install)
	(cd ./serverless ; yarn install)

.PHONY: test
test:
	(cd ./serverless ; npm run test)
	(cd ./web ; npm run test)

.PHONY: lint
lint:
	(cd ./serverless ; npm run lint)
	(cd ./web ; npm run lint)

###############################
# Component-specific commands #
###############################

.PHONY: build
build:
	(cd ./web ; npm run build)

.PHONY: web
web:
	(cd ./web ; npm start)

.PHONY: serverless
serverless:
	(cd ./serverless ; npm start)
