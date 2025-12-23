<?php
$cfg['blowfish_secret'] = 'U05ngtDotAW18vxUduzVpQLolnV2Ne3A';

$i = 1;
$cfg['Servers'][$i]['auth_type'] = 'config';
$cfg['Servers'][$i]['host'] = '10.128.19.2';
$cfg['Servers'][$i]['user'] = 'galetteuser';
$cfg['Servers'][$i]['password'] = 'galettepwd';
$cfg['Servers'][$i]['port'] = 3306;
$cfg['Servers'][$i]['verbose'] = 'Galette';

$i = 2;
$cfg['Servers'][$i]['auth_type'] = 'config';
$cfg['Servers'][$i]['host'] = '10.128.21.2';
$cfg['Servers'][$i]['user'] = 'root';
$cfg['Servers'][$i]['password'] = 'mon_password';
$cfg['Servers'][$i]['port'] = 3306;
$cfg['Servers'][$i]['verbose'] = 'Webapp';

$cfg['ServerDefault'] = 1;
$cfg['ShowServerChoice'] = true;
