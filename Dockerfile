FROM drupal:10.2.4

# Add composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Install packages and remove lists
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    vim \
    libpng-dev \
    libjpeg62-turbo-dev \
    libwebp-dev \
    libzip-dev \
    libicu-dev \
    --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

# Enable the necessary PHP extensions including GD with JPEG and PNG support
RUN docker-php-ext-configure gd --with-jpeg --with-webp \
    && docker-php-ext-install pdo_mysql zip gd intl bcmath

# Increase PHP memory limit and other variables for Drupal
RUN { \
    echo 'memory_limit=512M'; \
    echo 'upload_max_filesize=24M'; \
    echo 'post_max_size=25M'; \
    echo 'max_execution_time=60'; \
    echo 'max_input_vars=1000'; \
    echo 'file_uploads=On'; \
} > /usr/local/etc/php/conf.d/drupal.ini

# Copy composer.json to install required Drupal packages and dependencies
COPY ./composer.json composer.lock /opt/drupal/
COPY ./modules /opt/drupal/web/modules
COPY ./profiles /opt/drupal/web/profiles
COPY ./themes /opt/drupal/web/themes
COPY ./sites /opt/drupal/web/sites
COPY ./libraries /opt/drupal/web/libraries
COPY ./sites/default/files /opt/drupal/web/sites/default/files

# Install Drupal dependencies
RUN composer install --no-dev --optimize-autoloader --no-interaction --working-dir=/opt/drupal

# Adjust the path so we can use drush
ENV PATH="/root/.composer/vendor/bin:${PATH}"

# Create private files directory
RUN mkdir -p /opt/drupal/private \
    && chown -R www-data:www-data /opt/drupal/private \
    && chmod -R 770 /opt/drupal/private

# Set the working directory
WORKDIR /opt/drupal/web

# Install Node.js and npm
RUN curl -sL https://deb.nodesource.com/setup_14.x | bash - \
  && apt-get install -y nodejs

# Add Drush to the system PATH
ENV PATH="${PATH}:/root/.composer/vendor/bin"

# Set entrypoint script as the container entrypoint
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]
CMD ["apache2-foreground"]
