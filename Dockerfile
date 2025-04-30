FROM php:8.2-fpm-alpine

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

# Set working directory
WORKDIR /var/www/html

# Copy composer and install dependencies
COPY composer.json composer.lock ./
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
RUN composer install --no-dev --optimize-autoloader

# Copy app files
COPY . .

# Build assets with Vite
RUN npm install && npm run build

# Set permissions for storage and bootstrap cache
RUN chown -R www-data:www-data storage bootstrap/cache

# Copy nginx config
COPY ./docker/nginx.conf /etc/nginx/nginx.conf

# Expose ports
EXPOSE 80 443

# Start PHP-FPM and Nginx in foreground
CMD sh -c "php-fpm & nginx -g 'daemon off;'"