FROM node:carbon

COPY .env .env
COPY package.json package.json
COPY yarn.lock yarn.lock

RUN yarn install --production --silent
COPY . .

EXPOSE 8080
ENTRYPOINT [ "yarn", "start", "--host", "0.0.0.0" ]
