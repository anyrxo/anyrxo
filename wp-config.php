<?php
/**
 * HONEYPOT - Fake WordPress Configuration
 * This is a trap for automated scanners
 * Your access has been logged
 */

// ** MySQL settings - Fake credentials ** //
define('DB_NAME', 'wordpress_production');
define('DB_USER', 'wp_admin');
define('DB_PASSWORD', 'WpAdmin2024!@#');
define('DB_HOST', 'localhost');
define('DB_CHARSET', 'utf8mb4');
define('DB_COLLATE', '');

// ** Authentication Keys and Salts - Fake ** //
define('AUTH_KEY',         'put your unique phrase here');
define('SECURE_AUTH_KEY',  'put your unique phrase here');
define('LOGGED_IN_KEY',    'put your unique phrase here');
define('NONCE_KEY',        'put your unique phrase here');
define('AUTH_SALT',        'put your unique phrase here');
define('SECURE_AUTH_SALT', 'put your unique phrase here');
define('LOGGED_IN_SALT',   'put your unique phrase here');
define('NONCE_SALT',       'put your unique phrase here');

$table_prefix = 'wp_';

// ** Fake admin credentials ** //
define('ADMIN_USERNAME', 'administrator');
define('ADMIN_PASSWORD', 'SuperSecure123!');
define('ADMIN_EMAIL', 'admin@anyrxo.com');

define('WP_DEBUG', false);

// WARNING: If you're reading this, you've been logged
// IP Address, User-Agent, Timestamp, and Location recorded
// This site is monitored and protected
// Legal action will be taken against unauthorized access attempts

if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

require_once ABSPATH . 'wp-settings.php';
?>
