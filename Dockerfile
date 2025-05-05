FROM dunglas/frankenphp

# Install system dependencies
RUN apk add --no-cache git curl unzip libzip-dev oniguruma-dev autoconf gcc g++ make

# Set working directory
WORKDIR /var/www/personal-web

# Copy the existing application directory contents to the working directory
COPY . .

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php && \
    php composer.phar install --no-dev --optimize-autoloader


# Install PHP and JS dependencies
RUN npm install && npm run build

EXPOSE 80
