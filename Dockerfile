FROM node:14-alpine as build

RUN set -eux & \
    apk update && apk add --no-cache yarn

WORKDIR /usr/app

COPY ./source .

RUN yarn
RUN yarn build
RUN yarn --prod


FROM node:14-alpine 

RUN set -eux & \
    apk add --no-cache yarn

# # install nginx and bash
# RUN apk update && apk add --no-cache nginx bash && \
#       mkdir -p /run/nginx && \
#       rm -rf /var/cache/apk/*

WORKDIR /usr/src/app

RUN mkdir dist node_modules
RUN mkdir -p dist/certs

COPY --from=build /usr/app/dist ./dist
COPY --from=build /usr/app/node_modules ./node_modules
COPY --from=build /usr/app/package.json .
COPY --from=build /usr/app/tsconfig.json .
COPY --from=build /usr/app/tsconfig-paths-bootstrap.js .

CMD ["yarn", "start:prod"]