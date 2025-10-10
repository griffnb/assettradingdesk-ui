FROM nginx:alpine

# Remove the default conf
RUN rm /etc/nginx/conf.d/default.conf

# Copy our custom nextjs nginx conf
COPY ./*.conf /etc/nginx/conf.d/

EXPOSE 8080

CMD [ "nginx", "-g", "daemon off;" ]