#stage 1
FROM node:latest as node
WORKDIR /app
COPY . .
ENV ENVIRONMENT=production
ENV PATAPI_URL=http://localhost:4545
RUN npm install
RUN npm run build --prod

#stage 2
FROM nginx:alpine
COPY --from=node /app/dist/lupus /usr/share/nginx/html