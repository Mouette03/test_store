sudo tee /runtipi/apps-store/phpmyadmin/config.user.inc.php << 'EOF'
<?php
/* Override Servers array */
$cfg['Servers'] = [
    1 => [
        'auth_type' => 'cookie',
        'host' => '10.128.19.2',
        'port' => 3306,
        'verbose' => 'Galette',
    ],
    2 => [
        'auth_type' => 'cookie',
        'host' => '10.128.21.2',
        'port' => 3306,
        'verbose' => 'Webapp',
    ],
];
$cfg['AllowArbitraryServer'] = true;
EOF
