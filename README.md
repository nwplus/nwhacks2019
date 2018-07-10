<h1 align="center">nwHacks 2019 ⛰</h1>
<p align="center">
  The website, registration, and check-in system for nwHacks 2019
</p>

<p align="center">
  <a href="https://travis-ci.com/nwhacks/nwhacks2019">
    <img src="https://travis-ci.com/nwhacks/nwhacks2019.svg?branch=master"
      alt="Build Status" />
  </a>

  <a href="https://coveralls.io/github/nwhacks/nwhacks2019">
    <img src="https://coveralls.io/repos/github/nwhacks/nwhacks2019/badge.svg?branch=master">
  </a>
</p>

<br>

## :construction: Development

```bash
$> git clone https://github.com/nwhacks/nwhacks2019.git
$> cd nwhacks2019 ; make
```

To deploy locally:

First, create a file called `.env` by following the template in `.example.env`.

```bash
# serve web app
$> make web

# invoke specific serverless function
$> serverless invoke local --function some_function
```

To build the web app into `docs/`:

```bash
$> make build
```
