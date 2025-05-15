FROM dunglas/frankenphp:php8.2

# set project domain name
ENV SERVER_NAME=divawidia.my.id

# set project work directory
WORKDIR /var/www/personal-web

# set project folder owner
COPY --chown=www-data:www-data  . .

# Install system dependencies
RUN apt-get update && apt-get install -y \
    zlib1g-dev \
    libpng-dev \
    libjpeg62-turbo-dev \
    libwebp-dev \
    libxpm-dev \
    zip \
    unzip \
    git \
    curl \
    sqlite3 \
    libsqlite3-dev \
    libzip-dev \
    && docker-php-ext-configure gd --with-jpeg --with-webp --with-xpm \
    && docker-php-ext-install pdo pdo_sqlite gd zip bcmath opcache \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Install Node.js (change version if needed)
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# copy project's Composer package to project directory
COPY composer.json composer.lock ./

RUN git config --global --add safe.directory /var/www/personal-web

# Install laravel octane and other dependencies
RUN composer require laravel/octane --no-interaction --no-progress --no-scripts --no-plugins\
    && composer install --no-dev --optimize-autoloader --no-interaction --no-progress \

# Install Node.js dependencies and build assets
RUN npm install \
    && npm run build \

# Clear config, cache, and install laravel octane with frankenphp server
RUN php artisan config:clear \
    && php artisan cache:clear \
    && php artisan octane:install --server=frankenphp

# Fix permissions for storage and cache directories
RUN chown -R www-data:www-data storage bootstrap/cache \
    && chmod -R 775 storage bootstrap/cache \

# Expose port 8000 internally
EXPOSE 8000

# Start Laravel Octane FrankenPHP server binding to all interfaces
ENTRYPOINT ["php", "artisan", "octane:frankenphp", "--host=0.0.0.0", "--port=8000"]
