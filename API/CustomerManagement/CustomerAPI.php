<?php
include_once '../CustomerManagement/CustomerManagement.php';
include_once '../DatabaseConnection/DatabaseConn.php';
include_once '../config/tokenCore.php';
include_once '../Auth/TokenManagement.php';
require_once('../vendor/autoload.php');

//register_shutdown_function('my_error_handler');
use \Firebase\JWT\JWT;

class CustomerAPI
{
    private $customerManagement;
    private static $accType = 'Customer';

    public function __construct()
    {
        $databaseConn = new DatabaseConn();
        $conn = $databaseConn->getConn();
        $this->customerManagement = new CustomerManagement($conn);
    }

    public function registerCustomer()
    {
        $data = json_decode(file_get_contents("php://input"));
        $email = $data->email;

        if ($this->customerManagement->checkIfEmailExist($email)) {
            if ($this->customerManagement->registerNewCustomer($data)) {
                http_response_code(200);
                echo json_encode(array(
                    "message" => "Account registered successful!"
                ));
            } else {
                http_response_code(400);
                echo json_encode(array(
                    "message" => "Server Error"
                ));
            }
        } else {
            http_response_code(400);
            echo json_encode(array(
                "message" => "There is account connceted with this email"
            ));
        }
    }

    public function logInCustomer()
    {
        $data = json_decode(file_get_contents("php://input"));
        $email = $data->email;
        $password = $data->password;

        if ($this->customerManagement->checkIfCustomerExist($email, $password)) {
            http_response_code(200);
            $jwt = TokenManagement::createToken($this->customerManagement->id, self::$accType);
            echo json_encode(
                array(
                    "id" => $this->customerManagement->id,
                    "password" => $this->customerManagement->first_name,
                    "last_name" => $this->customerManagement->last_name,
                    "address_street" => $this->customerManagement->address_street,
                    "address_postal_code" => $this->customerManagement->address_postal_code,
                    "address_city" => $this->customerManagement->address_city,
                    "login" => $this->customerManagement->login,
                    "email" => $this->customerManagement->email,
                    "mobile" => $this->customerManagement->mobile,
                    "jwt" => $jwt,
                    "message" => "User logged successful!"
                )
            );
        } else {
            http_response_code(401);
            echo json_encode(
                array(
                    "message" => "User does not exist!"
                )
            );
        }
    }

    public function addToBasket()
    {
        $data = json_decode(file_get_contents("php://input"));
        $jwt = isset($data->jwt) ? $data->jwt : "";
        $customerData = TokenManagement::decodeToken($jwt);
        if ($customerData->accType == CustomerAPI::$accType) {
            if ($this->customerManagement->addToBasket($data, $customerData->id)) {
                http_response_code(200);
                echo json_encode(array(
                    "message" => "Element added successful"
                ));
            } else {
                http_response_code(400);
                echo json_encode(array(
                    "message" => "Something went wrong. Check if requested amount is at least equal to stock amount."
                ));
            }
        } else {
            http_response_code(403);
            echo json_encode(array(
                "message" => "Access denied!"
            ));
        }
    }

    public function getBasket()
    {
        $data = json_decode(file_get_contents("php://input"));
        $jwt = isset($data->jwt) ? $data->jwt : "";
        $customerData = TokenManagement::decodeToken($jwt);
        if ($customerData->accType == CustomerAPI::$accType) {
            $resultSet = $this->customerManagement->getBasket($customerData->id);
            $basket = array();
            while ($row = $resultSet->fetch(PDO::FETCH_ASSOC)) {
                $basket[] = $row;
            }
            http_response_code(200);
            echo json_encode(array(
                'basket' => $basket
            ));
        } else {
            http_response_code(403);
            echo json_encode(array(
                "message" => "Access denied!"
            ));
        }
    }


    public function deleteFromBasket()
    {
        $data = json_decode(file_get_contents("php://input"));
        $jwt = isset($data->jwt) ? $data->jwt : "";
        $customerData = TokenManagement::decodeToken($jwt);
        if ($customerData->accType == CustomerAPI::$accType) {
            if ($this->customerManagement->deleteFromBasket($data, $customerData->id)) {
                http_response_code(200);
                echo json_encode(array(
                    "message" => "Element(s) deleted successful"
                ));
            } else {
                http_response_code(400);
                echo json_encode(array(
                    "message" => "Something went wrong."
                ));
            }
        } else {
            http_response_code(403);
            echo json_encode(array(
                "message" => "Access denied!"
            ));
        }
    }

    public function getCustomerData(){
        $data = json_decode(file_get_contents("php://input"));
        $jwt = isset($data->jwt) ? $data->jwt : "";
        $customerData = TokenManagement::decodeToken($jwt);
        if ($customerData->accType == CustomerAPI::$accType) {
            $resultSet = $this->customerManagement->getCustomerData($customerData->id);
            $dataFromDB = array();
            while ($row = $resultSet->fetch(PDO::FETCH_ASSOC)) {
                $dataFromDB[] = $row;
            }
            http_response_code(200);
            echo json_encode(array(
                'customerData' => $dataFromDB
            ));
        } else {
            http_response_code(403);
            echo json_encode(array(
                "message" => "Access denied!"
            ));
        }
    }

    public function updateCustomerData(){
        $data = json_decode(file_get_contents("php://input"));
        $jwt = isset($data->jwt) ? $data->jwt : "";
        $customerData = TokenManagement::decodeToken($jwt);
        if ($customerData->accType == CustomerAPI::$accType) {
            if ($this->customerManagement->updateCustomerData($customerData->id, $data)){
                http_response_code(200);
                echo json_encode(array(
                    "message" => "Customer data updated"
                ));
            }else{
                http_response_code(400);
                echo json_encode(array(
                    "message" => "Error during updating data"
                ));
            }
        } else {
            http_response_code(403);
            echo json_encode(array(
                "message" => "Access denied!"
            ));
        }
    }

}