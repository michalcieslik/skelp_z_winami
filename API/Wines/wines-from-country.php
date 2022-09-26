<?php
include_once '../WinesManagement/WinesAPI.php';
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    if (isset($_GET['country'])) {
        $country = htmlspecialchars(strip_tags($_GET['country']));
        $winesAPI = new winesAPI();
        $winesAPI->getWinesFromCountry($country);
    }else{
        http_response_code(404);
        echo json_encode(array(
            "message"=>"Country not specified!"
        ));
    }
} else {
    http_response_code(404);
    echo json_encode(array(
        "message"=>"Get method required"
    ));
}