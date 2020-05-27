FROM node:10 as build-deps

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn

RUN yarn global add blitz

COPY . ./

RUN blitz db migrate

RUN blitz build

CMD [ "yarn", "next", "start", "-H", "0.0.0.0" ]

FROM nginx:alpine

COPY --from=build-deps /usr/src/app/build /usr/share/nginx/html

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]