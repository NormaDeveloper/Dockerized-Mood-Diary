FROM node:lts-bullseye as base 
WORKDIR /app
FROM base as builder
COPY . .
RUN npm i
RUN npm run build -- --prod 

FROM base as runner
COPY nginx/default.conf /etc/nginx/conf.d/
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /app/build /usr/share/nginx/html 
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]