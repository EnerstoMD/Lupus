#stage 1
FROM node:latest as node
WORKDIR /app
COPY . .
ENV ENVIRONMENT=production
RUN npm install
RUN npm run build --prod

#stage 2
FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html/* && rm -rf /etc/nginx/nginx.conf
COPY --from=node /app/nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=node /app/dist/lupus /usr/share/nginx/html
COPY --from=node /app/scripts/replace_api_url.sh /usr/local/bin/replace_api_url.sh
CMD ["/bin/sh", "/usr/local/bin/replace_api_url.sh"]

EXPOSE 80