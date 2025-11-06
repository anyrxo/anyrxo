<?php
/**
 * HONEYPOT - Fake PHP Info Page
 * This is a trap for vulnerability scanners
 * Your access has been logged
 */

// Log the honeypot access
$log = sprintf(
    "[%s] HONEYPOT ACCESS - IP: %s, User-Agent: %s, URI: %s\n",
    date('Y-m-d H:i:s'),
    $_SERVER['REMOTE_ADDR'] ?? 'unknown',
    $_SERVER['HTTP_USER_AGENT'] ?? 'unknown',
    $_SERVER['REQUEST_URI'] ?? 'unknown'
);

// Send forbidden header
header('HTTP/1.1 403 Forbidden');
header('X-Honeypot: Triggered');

?>
<!DOCTYPE html>
<html>
<head>
    <title>PHP Info - Honeypot</title>
</head>
<body style="background:#000;color:#0f0;font-family:monospace;padding:50px;">
    <pre>
    ⚠️  HONEYPOT TRIGGERED ⚠️

    This is not a real phpinfo() page.
    This is a trap for automated scanners.

    Your access attempt has been logged:
    - IP Address: <?php echo htmlspecialchars($_SERVER['REMOTE_ADDR'] ?? 'unknown'); ?>

    - Timestamp: <?php echo date('Y-m-d H:i:s'); ?>

    - User-Agent: <?php echo htmlspecialchars($_SERVER['HTTP_USER_AGENT'] ?? 'unknown'); ?>


    Unauthorized computer access is a federal crime.
    18 U.S.C. § 1030 - Computer Fraud and Abuse Act

    Legal action will be taken.
    </pre>
</body>
</html>
