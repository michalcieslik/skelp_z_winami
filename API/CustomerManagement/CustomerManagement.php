<?php

class CustomerManagement
{
    private $conn;
    public $id;
    public $first_name;
    public $last_name;
    public $address_city;
    public $address_postal_code;
    public $address_street;
    public $login;
    private $password;
    public $email;
    public $mobile;

    public function __construct($conn)
    {
        $this->conn = $conn;
    }

    public function checkIfCustomerExist($email, $password)
    {
        $query = "SELECT * FROM customers WHERE email = :email AND password = :password";
        $stmt = $this->conn->prepare($query);
        $this->email = htmlspecialchars(strip_tags($email));
        $this->password = htmlspecialchars(strip_tags($password));
        $stmt->bindParam(':email', $this->email);
        $stmt->bindParam(':password', $this->password);
        try {
            $stmt->execute();
            $rowNumber = $stmt->rowCount();
            if ($rowNumber == 1) {
                $resultSet = $stmt->fetch(PDO::FETCH_ASSOC);
                $this->id = $resultSet['id'];
                $this->first_name = $resultSet['first_name'];
                $this->last_name = $resultSet['last_name'];
                $this->address_city = $resultSet['address_city'];
                $this->address_postal_code = $resultSet['address_postal_code'];
                $this->address_street = $resultSet['address_street'];
                $this->email = $resultSet['email'];
                $this->mobile = $resultSet['mobile'];
                return true;
            }
            $this->login = '';
            $this->password = '';
            return false;
        }catch (PDOException $e){
            http_response_code(500);
            die(json_encode(array(
                "message"=>"DB error"
            )));
        }

    }

    public function registerNewCustomer($data)
    {
        $query = "INSERT INTO customers (first_name, last_name, 
                       address_city, address_postal_code,
                       address_street, login,
                       password, email,
                       mobile) VALUES (
                              :first_name, :last_name, 
                              :address_city, :address_postal_code, 
                              :address_street, :login,
                              :password, :email,
                              :mobile)";

        $stmt = $this->conn->prepare($query);
        $this->setParams($data);
        $stmt->bindParam(":first_name", $this->first_name);
        $stmt->bindParam(":last_name", $this->last_name);
        $stmt->bindParam(":address_city", $this->address_city);
        $stmt->bindParam(":address_postal_code", $this->address_postal_code);
        $stmt->bindParam(":address_street", $this->address_street);
        $stmt->bindParam(":login", $this->login);
        $stmt->bindParam(":password", $this->password);
        $stmt->bindParam(":email", $this->email);
        $stmt->bindParam(":mobile", $this->mobile);
        try {
            if ($stmt->execute()) {
                return true;
            }
            return false;
        }catch (PDOException $e){
            http_response_code(500);
            die(json_encode(array(
                "message"=>"DB error"
            )));
        }

    }

    public function checkIfEmailExist($email)
    {
        $query = "SELECT email FROM customers WHERE email = :email";
        $stmt = $this->conn->prepare($query);
        $tempEmail = htmlspecialchars(strip_tags($email));
        $stmt->bindParam(":email", $tempEmail);
        try {
            $stmt->execute();
            return $stmt->rowCount() == 0;
        }catch (PDOException $e){
            http_response_code(500);
            die(json_encode(array(
                "message"=>"DB error"
            )));
        }
    }

    public function addToBasket($data, $customerId){
        $query = "INSERT INTO basket (id_customer, id_wine, amount) VALUES (:id_customer, :id_wine, :amount)";
        $stmt = $this->conn->prepare($query);
        $wineId = htmlspecialchars(strip_tags($data->wineId));
        $customerId = htmlspecialchars(strip_tags($customerId));
        $amount = htmlspecialchars(strip_tags($data->amount));
        $stmt->bindParam(":id_customer", $customerId);
        $stmt->bindParam(":id_wine", $wineId);
        $stmt->bindParam(":amount", $amount);
        try {
            if ($stmt->execute())
                return true;
            return false;
        }catch (PDOException $e){
            return false;
        }
    }

    public function getBasket($customerId){
        $query = "SELECT wine.name as wineName, wine.id as wineId, count(basket.amount) as amount FROM basket, wine WHERE id_customer = :id_customer AND wine.id = id_wine GROUP BY wineName, wineId";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":id_customer", $customerId);
        try {
            $stmt->execute();
            return $stmt;
        }catch (PDOException $e){
            http_response_code(500);
            die(json_encode(array(
                "message"=>"DB error"
            )));
        }
    }

    public function deleteFromBasket($data, $customerId){
        $wineId = $data->wineId;
        $query = "DELETE FROM basket WHERE id_customer = :id_customer AND id_wine = :id_wine";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":id_customer", $customerId);
        $stmt->bindParam(":id_wine", $wineId);
        try {
            if ($stmt->execute())
                return true;
            return false;
        }catch (PDOException $e){
            return false;
        }
    }

    public function getCustomerData($customerId){
        $query = "SELECT first_name, last_name, address_city, address_postal_code, address_street, email, mobile FROM customers WHERE id = :id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":id", $customerId);
        try {
            $stmt->execute();
            return $stmt;
        }catch (PDOException $e){
            http_response_code(500);
            die(json_encode(array(
                "message"=>"DB error"
            )));
        }
    }

    public function updateCustomerData($customerId, $data){
        $query = "UPDATE customers SET first_name = :first_name, last_name = :last_name, address_city = :address_city, address_postal_code = :address_postal_code, address_street=:address_street, mobile = :mobile WHERE customers.id = :customerId";
        $firstName = htmlspecialchars(strip_tags($data->firstName));
        $lastName = htmlspecialchars(strip_tags($data->lastName));
        $addressCity = htmlspecialchars(strip_tags($data->addressCity));
        $addressPostalCode = htmlspecialchars(strip_tags($data->addressPostalCode));
        $addressStreet = htmlspecialchars(strip_tags($data->addressStreet));
        $mobile = htmlspecialchars(strip_tags($data->mobile));

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":first_name", $firstName);
        $stmt->bindParam(":last_name", $lastName);
        $stmt->bindParam(":address_city", $addressCity);
        $stmt->bindParam(":address_postal_code", $addressPostalCode);
        $stmt->bindParam(":address_street", $addressStreet);
        $stmt->bindParam(":mobile", $mobile);
        $stmt->bindParam(":customerId", $customerId);
        try {
            if ($stmt->execute())
                return true;
            return false;
        }catch (PDOException $e){
            return false;
        }

    }
    

    private function setParams($data)
    {
        $this->login = htmlspecialchars(strip_tags($data->login));
        $this->password = htmlspecialchars(strip_tags($data->password));
        $this->first_name = htmlspecialchars(strip_tags($data->first_name));
        $this->last_name = htmlspecialchars(strip_tags($data->last_name));
        $this->address_city = htmlspecialchars(strip_tags($data->address_city));
        $this->address_postal_code = htmlspecialchars(strip_tags($data->address_postal_code));
        $this->address_street = htmlspecialchars(strip_tags($data->address_street));
        $this->email = htmlspecialchars(strip_tags($data->email));
        $this->mobile = htmlspecialchars(strip_tags($data->mobile));
    }

}