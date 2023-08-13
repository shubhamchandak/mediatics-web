# dev stage 
FROM node:20-alpine3.17 AS dev
WORKDIR /app
COPY . .
RUN npm install 
RUN npm run build --prod

# production stage final image
FROM nginx:1.25.1
COPY --from=dev /app/dist/web /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
