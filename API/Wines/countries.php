<?php
include_once '../WinesManagement/WinesManagement.php';
include_once '../WinesManagement/WinesAPI.php';
include_once '../errorfun.php';
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");

if ($_SERVER['REQUEST_METHOD']=='POST') {
    $winesAPI = new WinesAPI();
    $winesAPI->getOriginCountries();
}else{
    http_response_code(404);
    echo json_encode(array(
        "message"=>"POST method required"
    ));
}