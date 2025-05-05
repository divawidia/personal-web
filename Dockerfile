FROM php:8.2-fpm-alpine

# Set working directory
WORKDIR /var/www/personal-web

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
# RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Copy the existing application directory contents to the working directory
COPY . .

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Install PHP and JS dependencies
RUN composer install --no-dev --prefer-dist --optimize-autoloader \
    && npm install \
    && npm run build

# Set permissions
RUN chown -R www-data:www-data /var/www/personal-web && chmod -R 775 /var/www/personal-web/storage

# Expose PHP-FPM port
EXPOSE 9000

# Start PHP-FPM and Nginx in foreground
CMD sh -c "php-fpm & nginx -g 'daemon off;'"
