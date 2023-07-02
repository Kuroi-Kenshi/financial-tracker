FROM node:18-alpine3.16 AS builder

WORKDIR /opt/financial-tracker

COPY package.json ./
COPY yarn.lock ./

RUN yarn

COPY . .

RUN npx prisma generate
RUN yarn build

FROM node:18-alpine3.16

COPY --from=builder /opt/financial-tracker/node_modules ./node_modules
COPY --from=builder /opt/financial-tracker/package.json ./
COPY --from=builder /opt/financial-tracker/yarn.lock ./
COPY --from=builder /opt/financial-tracker/dist ./dist
COPY --from=builder /opt/financial-tracker/prisma ./prisma
COPY --from=builder /opt/financial-tracker/.env .env

CMD [ "yarn", "start:migrate:prod" ]