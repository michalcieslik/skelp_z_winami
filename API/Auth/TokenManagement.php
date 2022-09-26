<?php
include_once '../config/errorConfig.php';
include_once '../config/tokenCore.php';
require_once('../vendor/autoload.php');
use \Firebase\JWT\JWT;
use Firebase\JWT\Key;

class TokenManagement
{
    public static function createToken($id, $accType){
        global $issued_at;
        global $expiration_time;
        global $key;
        global $issuer;
        $token = array(
            "iat" => $issued_at,
            "nbf" => $issued_at,
            "exp" => $expiration_time,
            "iss" => $issuer,
            "data" => array(
                "id" => $id,
                "accType"=>$accType
            )
        );
        return JWT::encode($token, $key, 'HS256');
    }

    public static function decodeToken($jwt){
        global $key;
        if (!empty($jwt)){
            try {
                $decoded = JWT::decode($jwt, new Key($key, 'HS256'));
                return $decoded->data;
            }catch (\Firebase\JWT\ExpiredException $e){
                http_response_code(403);
                die(json_encode(array(
                    "message"=>$e->getMessage()
                )));
            }catch (UnexpectedValueException $e){
                http_response_code(500);
                die(json_encode(array(
                    "message"=>"JWT internal error"
                )));
            }
        }else{
            http_response_code(403);
            die(json_encode(array(
                "message"=>'JWT required'
            )));
        }
    }

}