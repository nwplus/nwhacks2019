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
	(cd ./serverless ; yarn test)
	(cd ./web ; yarn test)

.PHONY: lint
lint:
	(cd ./serverless ; yarn lint)
	(cd ./web ; yarn lint)

.PHONY: report-coverage
report-coverage:
	mkdir -p .nyc_output
	cp serverless/coverage/coverage-final.json .nyc_output/coverage-serverless.json
	cp web/coverage/coverage-final.json .nyc_output/coverage-web.json
	nyc report --reporter=text-lcov | coveralls

###############################
# Component-specific commands #
###############################

.PHONY: build
build:
	(cd ./web ; yarn build)

.PHONY: web
web:
	(cd ./web ; yarn start)

.PHONY: serverless
serverless:
	(cd ./serverless ; yarn start)
