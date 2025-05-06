FROM php:8.2-fpm-alpine

# Install system dependencies
RUN apk add --no-cache \
    bash \
    git \
    curl \
    libpng-dev \
    libjpeg-turbo-dev \
    libwebp-dev \
    libxpm-dev \
    libzip-dev \
    oniguruma-dev \
    zip \
    unzip \
    sqlite \
    sqlite-dev \
    nodejs \
    npm \
    && docker-php-ext-configure gd --with-jpeg --with-webp --with-xpm \
    && docker-php-ext-install pdo pdo_mysql gd zip bcmath opcache

# Clear cache
# RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www/personal-web

# Copy the existing application directory contents to the working directory
COPY . .

# Install PHP and JS dependencies
RUN composer install --no-dev --optimize-autoloader \
    && npm install \
    && npm run build

# Set permissions
# RUN chown -R www-data:www-data ./storage ./bootstrap/cache \
#    && chmod -R 775 ./storage ./bootstrap/cache \

# Copy the existing application directory permissions to the working directory
COPY --chown=www-data:www-data . /var/www/personal-web

# Expose PHP-FPM port
EXPOSE 9000

# Start PHP-FPM and Nginx in foreground
CMD ["php-fpm"]
