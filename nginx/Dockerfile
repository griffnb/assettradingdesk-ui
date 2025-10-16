FROM nginx:alpine

ARG CONFIG_TYPE=default

# Remove the default conf
RUN rm /etc/nginx/conf.d/default.conf


# Copy our custom nextjs nginx conf
COPY ./${CONFIG_TYPE}.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080

CMD [ "nginx", "-g", "daemon off;" ]