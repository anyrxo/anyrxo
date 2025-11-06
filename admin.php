<?php
/**
 * HONEYPOT - Fake Admin Panel
 * This is a trap for unauthorized access attempts
 * Your IP and activity have been logged
 */

session_start();

// Log the access attempt
$log_data = array(
    'timestamp' => date('Y-m-d H:i:s'),
    'ip' => $_SERVER['REMOTE_ADDR'] ?? 'unknown',
    'user_agent' => $_SERVER['HTTP_USER_AGENT'] ?? 'unknown',
    'referer' => $_SERVER['HTTP_REFERER'] ?? 'direct',
    'request_uri' => $_SERVER['REQUEST_URI'] ?? 'unknown'
);

// WARNING: This is a honeypot
// All access attempts are logged and monitored
// Unauthorized access is illegal

header('HTTP/1.1 403 Forbidden');
?>
<!DOCTYPE html>
<html>
<head>
    <title>Admin Panel - Access Denied</title>
    <style>
        body {
            background: #1a1a1a;
            color: #ff0000;
            font-family: monospace;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
        }
        .warning {
            text-align: center;
            border: 2px solid #ff0000;
            padding: 40px;
            max-width: 600px;
        }
        h1 { font-size: 32px; margin-bottom: 20px; }
        p { font-size: 14px; line-height: 1.6; }
    </style>
</head>
<body>
    <div class="warning">
        <h1>⚠️ UNAUTHORIZED ACCESS DETECTED</h1>
        <p>This is a honeypot. Your access attempt has been logged.</p>
        <p><strong>IP Address:</strong> <?php echo htmlspecialchars($_SERVER['REMOTE_ADDR'] ?? 'unknown'); ?></p>
        <p><strong>Timestamp:</strong> <?php echo date('Y-m-d H:i:s'); ?></p>
        <p><strong>User-Agent:</strong> <?php echo htmlspecialchars(substr($_SERVER['HTTP_USER_AGENT'] ?? 'unknown', 0, 100)); ?></p>
        <p style="margin-top: 30px; color: #ffffff;">Unauthorized access to computer systems is illegal under 18 U.S.C. § 1030 and similar international laws.</p>
        <p style="color: #ffffff;">Legal action will be pursued.</p>
    </div>
</body>
</html>
