FROM nginx
RUN apt-get update && apt-get install nano
RUN rm /etc/nginx/conf.d/default.conf
COPY default.conf /etc/nginx/conf.d/default.conf