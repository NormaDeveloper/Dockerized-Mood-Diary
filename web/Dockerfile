#1. We use NODE image to install--------------
FROM node:lts-bullseye as base 

WORKDIR /app
# -----------------------------
FROM base as deps

COPY package.json .
COPY package-lock.json .

RUN npm i


#2. We use NODE image to build the app --------
FROM base as builder

#Add env variables as in the .env file 
ENV REACT_APP_API_URL="http://localhost"
ENV REACT_APP_API_PORT="3001"

COPY . .
COPY  --from=deps /app/node_modules node_modules

RUN npm run build -- --prod


#3. We use NGINX image to run the app --------
# NGINX is already configured by default and I don't have to add anything about the port or the CMD. It will just copy the files to the html's folder
FROM nginx as runner 

COPY nginx/default.conf /etc/nginx/conf.d/
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /app/build /usr/share/nginx/html 



# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]