<?php

date_default_timezone_set('Europe/Warsaw');

$key = "disGierczak";
$issued_at = time();
$expiration_time = $issued_at + 60*60*5;
$issuer = "https://s402340.labagh.pl/API";