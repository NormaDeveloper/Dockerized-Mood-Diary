FROM node:lts-bullseye as base 

WORKDIR /app

# ------------------
FROM base as deps

COPY package.json .
COPY package-lock.json .

RUN npm i --production

# -----------------

FROM base as runner

COPY . .
COPY --from=deps /app/node_modules node_modules

EXPOSE 3001

CMD ["npm", "start"]



