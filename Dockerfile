FROM dunglas/frankenphp

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
