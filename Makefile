all: deps

# List all commands
.PHONY: ls
ls:
	@$(MAKE) -pRrq -f $(lastword $(MAKEFILE_LIST)) : 2>/dev/null | awk -v RS= -F: '/^# File/,/^# Finished Make data base/ {if ($$1 !~ "^[#.]") {print $$1}}' | sort | egrep -v -e '^[^[:alnum:]]' -e '^$@$$' | xargs

###############################
#    Project-wide commands    #
###############################

.PHONY: deps
deps:
	@echo Installing web app dependencies...
	@(cd ./web ; yarn install)
	@echo Installing functions dependencies...
	@(cd ./functions ; yarn install)

.PHONY: test
test:
	@echo Running web app tests...
	@(cd ./web ; yarn test)
	@echo Running function tests...
	@(cd ./functions ; yarn test)

.PHONY: lint
lint:
	@echo Linting web app...
	@(cd ./web ; yarn lint)
	@echo Linting functions...
	@(cd ./functions ; yarn lint)

.PHONY: report-coverage
report-coverage:
	mkdir -p .nyc_output
	# todo: enable this once function tests are added
	# cp functions/coverage/coverage-final.json .nyc_output/coverage-functions.json
	cp web/coverage/coverage-final.json .nyc_output/coverage-web.json
	nyc report --reporter=text-lcov > coverage.lcov && codecov

###############################
# Component-specific commands #
###############################

# Builds front-end
.PHONY: build
build:
	@echo Building web app...
	@(rm -rf ./docs/assets/ ; mkdir -p ./docs/assets/ ; cp -r ./web/assets/favicon ./docs/assets/favicon; cd ./web ; yarn build)

# Runs webpack dev server
.PHONY: web
web:
	@echo Starting webpack-dev-server...
	@(cd ./web ; yarn start)

# Runs a simple web serve to test the build static web app
.PHONY: serve
serve:
	@(cd ./web ; yarn serve)

# Deploys cloud functions to production
.PHONY: deploy-prod
deploy-prod:
	@echo Deploying cloud functions to production...
	@(cd ./functions; yarn deploy:prod)

# Deploys cloud functions to development
.PHONY: deploy-dev
deploy-dev:
	@echo Deplying cloud functions to development...
	@(cd ./functions; yarn deploy:dev)

# Emulates cloud functions as local HTTP endpoints
.PHONY: functions
functions:
	@echo Running functions locally...
	@(cd ./functions ; yarn serve)

# Runs interactive shell for cloud functions
.PHONY: shell
shell:
	@echo Starting interactive shell for cloud functions...
	@(cd ./functions ; yarn start)
