FROM node:carbon

COPY .env .env
COPY web/package.json web/package.json
COPY web/yarn.lock web/yarn.lock

WORKDIR web
RUN yarn install --production --silent
COPY web .

RUN yarn build

EXPOSE 8080
ENTRYPOINT [ "yarn", "serve:public" ]
