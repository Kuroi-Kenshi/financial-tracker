FROM node:18-alpine3.16

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./

RUN yarn

COPY . .

RUN yarn update
RUN yarn seed
RUN yarn build

CMD [ "yarn", "start:prod" ]