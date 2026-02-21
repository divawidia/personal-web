#!/bin/bash
set -e

echo "Deployment started ..."

# Enter maintenance mode or return true
# if already is in maintenance mode
(php artisan down) || true
echo "Maintenance mode successfully activated ..."

# Pull the latest version of the app
git reset --hard
git pull origin main
echo "Successfully pulling from remote repository  ..."

# Install composer dependencies
composer install --no-dev --optimize-autoloader
echo "Successfully install composer dependencies ..."

composer dump-autoload
echo "Successfully dump autoload ..."

# Clear the old cache
php artisan optimize:clear

# Recreate cache
php artisan optimize
echo "Successfully run php optimize ..."

# Compile npm assets
npm install
npm run build
echo "Successfully compile npm ..."

# Exit maintenance mode
php artisan up

echo "Deployment finished!"
