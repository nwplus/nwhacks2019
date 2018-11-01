FROM node:carbon

COPY .env .env
COPY package.json package.json
COPY yarn.lock yarn.lock

RUN yarn install --production --silent --ignore-engines
COPY . .

EXPOSE 5000
ENTRYPOINT [ "yarn", "serve", "--host", "0.0.0.0" ]
