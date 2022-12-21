FROM alpine:3.16

RUN \
    apk -U --no-cache add \
    curl \
    nginx && \
    rm -rf /var/cache/apk/* /etc/nginx/http.d/*

# Configure nginx
COPY docker/nginx.conf /etc/nginx/nginx.conf

# Set working directory
WORKDIR /app

# Copy build files with change permissions
COPY --chown=nginx:nginx ./build /app

# Expose the port nginx is reachable on
EXPOSE 8080

# Run nginx
CMD ["nginx", "-g", "daemon off;"]