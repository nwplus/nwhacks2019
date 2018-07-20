all: deps

###############################
#    Project-wide commands    #
###############################

.PHONY: deps
deps:
	(cd ./web ; yarn install)
	(cd ./functions ; yarn install)

.PHONY: test
test:
	(cd ./functions ; yarn test)
	(cd ./web ; yarn test)

.PHONY: lint
lint:
	(cd ./functions ; yarn lint)
	(cd ./web ; yarn lint)

.PHONY: report-coverage
report-coverage:
	mkdir -p .nyc_output
	cp functions/coverage/coverage-final.json .nyc_output/coverage-functions.json
	cp web/coverage/coverage-final.json .nyc_output/coverage-web.json
	nyc report --reporter=text-lcov | coveralls

###############################
# Component-specific commands #
###############################

# Builds front-end
.PHONY: build
build:
	(cd ./web ; yarn build)

# Runs web server
.PHONY: web
web:
	(cd ./web ; yarn start)

# Deploys cloud functions to production
.PHONY: deploy-prod
deploy-prod:
	(cd ./functions; yarn deploy:prod)

# Deploys cloud functions to development
.PHONY: deploy-dev
deploy-dev:
	(cd ./functions; yarn deploy:dev)

# Emulates cloud functions as local HTTP endpoints
.PHONY: functions
functions:
	(cd ./functions ; yarn serve)

# Runs interactive shell for cloud functions
.PHONY: shell
shell:
	(cd ./functions ; yarn start)
