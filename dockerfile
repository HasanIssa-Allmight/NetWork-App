FROM node:22-alpine AS base


FROM base AS development
WORKDIR /app

COPY package.json .
RUN npm install
COPY  . .
EXPOSE 4000

CMD [ "npm" , "run" , "dev"]