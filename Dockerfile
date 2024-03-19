ARG NODE_VERSION=21.7.1

FROM node:${NODE_VERSION}-alpine

WORKDIR /usr/src/app

COPY package.json package-lock.json ./

RUN npm ci

COPY --chown=node:node . .

COPY prisma/schema.prisma ./prisma/

RUN npx prisma generate

RUN npm run tsc

EXPOSE 3003

CMD ["npm", "start"]