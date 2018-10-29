<h1 align="center">nwHacks 2019 ⛰</h1>
<p align="center">
  The website, registration, and check-in system for nwHacks 2019
</p>

<p align="center">
  <a href="https://travis-ci.com/nwplus/nwhacks2019">
    <img src="https://travis-ci.com/nwplus/nwhacks2019.svg?branch=master"
      alt="Build Status" />
  </a>

  <a href="https://codecov.io/gh/nwplus/nwhacks2019">
    <img src="https://codecov.io/gh/nwplus/nwhacks2019/branch/master/graph/badge.svg" />
  </a>
</p>

<br>

## :construction: Development

```bash
$> git clone https://github.com/nwplus/nwhacks2019.git
$> cd nwhacks2019 ; make
$> cp .example.env .env
$> vi .env # fill out environment variables
```

### Web App

The front-end is a React web app.

```bash
$> make web         # Serve web app using webpack-dev-server
$> make test        # To run the web app tests locally
$> make lint        # To run the linter locally
$> make build       # To build the web app into `./docs`
$> make serve       # Serve built static web app
```

### Functions

The back-end is powered by serverless functions deployed to Firebase.

```bash
$> make functions   # Deploy functions locally
$> make shell       # Start an interactive shell for functions

# Deployment
$> make deploy-dev
$> make deploy-prod
```

### Running the entire app
*For development:* To serve the web app locally and emulate the cloud functions locally, use `make dev`.
*For production:* To build the web app and publish the cloud functions to production, use `make prod`.
