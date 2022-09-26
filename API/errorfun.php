<?php
function my_error_handler(){
    $error = error_get_last();
    header('Content-Type: application/json');
    echo json_encode($error);
}