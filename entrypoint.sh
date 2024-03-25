#!/bin/bash

# change ownership of Drupal files
chown -R www-data:www-data /opt/drupal/web
chown -R www-data:www-data /opt/drupal/vendor
chown -R www-data:www-data /opt/drupal/composer.json
chown -R www-data:www-data /opt/drupal/composer.lock

# Continue with the original entrypoint command
exec "$@"
