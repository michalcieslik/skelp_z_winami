<?php


class ImporterManagement
{
    public $id;
    public $name;
    public $krs;
    public $login;
    private $password;
    private $conn;

    public function __construct($conn)
    {
        $this->conn = $conn;
    }

    public function checkIfImporterExist($login, $password)
    {
        $query = "SELECT * FROM importer WHERE login = :login AND password = :password";
        $stmt = $this->conn->prepare($query);
        $this->login = htmlspecialchars(strip_tags($login));
        $password = htmlspecialchars(strip_tags($password));
        $stmt->bindParam(':login', $this->login);
        $stmt->bindParam(':password', $password);
        try {
            $stmt->execute();
            $rowNumber = $stmt->rowCount();
            if ($rowNumber == 1) {
                $resultSet = $stmt->fetch(PDO::FETCH_ASSOC);
                $this->id = $resultSet['id_importer'];
                $this->name = $resultSet['name'];
                $this->krs = $resultSet['krs'];
                return true;
            }

            $this->login = '';
            return false;
        } catch (PDOException $e) {
            http_response_code(500);
            die(json_encode(array(
                "message" => "DB Error"
            )));
        }


    }

    public function checkUniquenessOfRegistrationData($login, $name, $krs)
    {
        $query = "SELECT * FROM importer WHERE login = :login AND name = :name AND krs = :krs";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':login', $login);
        $stmt->bindParam(':name', $name);
        $stmt->bindParam(':krs', $krs);
        try {
            $stmt->execute();
            $rowNumber = $stmt->rowCount();
            if ($rowNumber == 0) {
                return true;
            }
            return false;
        } catch (PDOException $e) {
            http_response_code(500);
            die(json_encode(array(
                "message" => "DB Error"
            )));
        }

    }

    public function registerNewImporter($data)
    {
        $query = "INSERT INTO importer (name, krs, login, password) VALUES (:name, :krs, :login, :password)";
        $stmt = $this->conn->prepare($query);
        $this->setParams($data);
        $stmt->bindParam(":name", $this->name);
        $stmt->bindParam(":login", $this->login);
        $stmt->bindParam(":password", $this->password);
        $stmt->bindParam(":krs", $this->krs);
        try {
            if ($stmt->execute())
                return true;
            return false;
        } catch (PDOException $e) {
            http_response_code(500);
            die(json_encode(array(
                "message" => "DB Error"
            )));
        }
    }

    public function createNewImport($data, $importerId)
    {
        $query = "INSERT INTO imports (id_importer, id_wine, quantity) VALUES (:id_importer, :id_wine, :quantity)";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":id_importer", $importerId);
        $stmt->bindParam(":id_wine", $data->wineId);
        $stmt->bindParam(":quantity", $data->quantity);
        try {
            if ($stmt->execute())
                return true;
            return false;
        } catch (PDOException $e) {
            return false;
        }
    }

    public function getImporterWines($importerId)
    {
        $query = "SELECT * FROM wine WHERE id_importer = :id_importer";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":id_importer", $importerId);
        try {
            $stmt->execute();
            return $stmt;
        } catch (PDOException $e) {
            http_response_code(500);
            die(json_encode(array(
                "message" => "DB Error"
            )));
        }

    }

    public function getAllImporters()
    {
        $query = "SELECT id_importer, name FROM importer";
        $stmt = $this->conn->prepare($query);
        try {
            $stmt->execute();
            return $stmt;
        } catch (PDOException $e) {
            http_response_code(500);
            die(json_encode(array(
                "message" => "DB Error"
            )));
        }
    }

    public function getImporterData($importerId)
    {
        $query = "SELECT name, krs, (SELECT count(*) FROM wine WHERE id_importer = :id_importer) AS winesNumber FROM importer WHERE id_importer = :id_importer";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":id_importer", $importerId);
        try {
            $stmt->execute();
            return $stmt;
        } catch (PDOException $e) {
            http_response_code(500);
            die(json_encode(array(
                "message" => "DB Error"
            )));
        }
    }

    private function setParams($data)
    {
        $this->login = htmlspecialchars(strip_tags($data->login));
        $this->name = htmlspecialchars(strip_tags($data->name));
        $this->krs = htmlspecialchars(strip_tags($data->krs));
        $this->password = htmlspecialchars(strip_tags($data->password));
    }

}