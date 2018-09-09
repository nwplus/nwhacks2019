FROM node:carbon

COPY .env .env
COPY docs docs

RUN yarn global add http-server

RUN echo "source ./.env ; export NODE_ENV=development ; http-server ./docs -a 0.0.0.0 -p 8080 -c-1" > entry.sh

EXPOSE 8080
ENTRYPOINT [ "bash", "entry.sh" ] 
