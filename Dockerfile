FROM php:8.2-fpm-alpine

# Set working directory
WORKDIR /var/www/html

# Install system dependencies
RUN apk add --no-cache \
    nginx \
    bash \
    curl \
    libzip-dev \
    oniguruma-dev \
    sqlite \
    sqlite-dev \
    nodejs \
    npm \
    supervisor \
    && docker-php-ext-install pdo pdo_sqlite zip mbstring bcmath

# Clear cache
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Copy the existing application directory contents to the working directory
COPY . /var/www/html

# Build assets with Vite
RUN npm install && npm run build

# Copy the existing application directory permissions to the working directory
COPY --chown=www-data:www-data . /var/www/html

# Copy nginx config
COPY ./docker/nginx.conf /etc/nginx/nginx.conf

# Expose ports
EXPOSE 80 443

# Start PHP-FPM and Nginx in foreground
CMD sh -c "php-fpm & nginx -g 'daemon off;'"