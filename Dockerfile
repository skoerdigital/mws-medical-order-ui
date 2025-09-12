FROM harbor.pzu.pl/docker.io/library/node:20-alpine AS node-runtime
FROM harbor.pzu.pl/docker.io/nginxinc/nginx-unprivileged:1.27.3

RUN rm /etc/nginx/conf.d/default.conf && \
    rm /etc/nginx/nginx.conf

COPY dockerResources/nginx-registration-ui.conf /etc/nginx/conf.d/
COPY dockerResources/nginx.conf /etc/nginx/
COPY dockerResources/docker-entrypoint.sh /
COPY mws-medical-order-ui /mws-medical-order-ui
COPY --from=node-runtime /usr/local /usr/local/
COPY --from=node-runtime /lib /lib
COPY --from=node-runtime /usr/lib /usr/lib

USER root

RUN cd /mws-medical-order-ui/api && npm ci --omit=dev --verbose --registry=https://repo.pzu.pl/repository/proxy-npm-all
RUN chmod +xr /docker-entrypoint.sh && \
    chown nginx:nginx -R /mws-medical-order-ui && \
    chmod +r /etc/nginx/nginx.conf /etc/nginx/conf.d/*.conf && \
    chown nginx:root /etc/nginx/nginx.conf /etc/nginx/conf.d/*.conf

USER nginx

EXPOSE 8080

ENTRYPOINT ["/docker-entrypoint.sh"]
