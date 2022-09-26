<?php
include_once '../Auth/TokenManagement.php';
include_once '../DatabaseConnection/DatabaseConn.php';
include_once 'ImporterManagement.php';

class ImporterAPI
{
    private $importerManagement;
    public static $accType = 'Importer';

    public function __construct()
    {
        $databaseConn = new DatabaseConn();
        $conn = $databaseConn->getConn();
        $this->importerManagement = new ImporterManagement($conn);
    }

    public function logInImporter()
    {
        $data = json_decode(file_get_contents("php://input"));
        $login = $data->login;
        $password = $data->password;

        if ($this->importerManagement->checkIfImporterExist($login, $password)) {
            http_response_code(200);
            $jwt = TokenManagement::createToken($this->importerManagement->id, self::$accType);
            echo json_encode(
                array(
                    "id" => $this->importerManagement->id,
                    "login" => $this->importerManagement->login,
                    "krs" => $this->importerManagement->krs,
                    "name" => $this->importerManagement->name,
                    "jwt" => $jwt,
                    "message" => "Importer logged successful!"
                )
            );
        } else {
            http_response_code(401);
            echo json_encode(
                array(
                    "message" => "Importer does not exist!"
                )
            );
        }
    }

    public function registerNewImporter()
    {
        $data = json_decode(file_get_contents("php://input"));
        $login = $data->login;
        $krs = $data->krs;
        $name = $data->name;

        if ($this->importerManagement->checkUniquenessOfRegistrationData($login, $name, $krs)) {
            if ($this->importerManagement->registerNewImporter($data)) {
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
                "message" => "There is account connceted with this login"
            ));
        }
    }

    public function createNewImport()
    {
        $data = json_decode(file_get_contents("php://input"));
        $jwt = isset($data->jwt) ? $data->jwt : "";
        $importerData = TokenManagement::decodeToken($jwt);
        if ($importerData->accType == self::$accType) {
            if ($this->importerManagement->createNewImport($data, $importerData->id)) {
                http_response_code(200);
                echo json_encode(array(
                    "message" => "Import created!"
                ));
            } else {
                http_response_code(400);
                echo json_encode(array(
                    "message" => "Import cannot be created!"
                ));
            }
        } else {
            http_response_code(403);
            echo json_encode(array(
                "message" => "Access denied!"
            ));
        }
    }

    public function getImporterWines()
    {
        $data = json_decode(file_get_contents("php://input"));
        $jwt = isset($data->jwt) ? $data->jwt : "";
        $importerData = TokenManagement::decodeToken($jwt);
        if ($importerData->accType == self::$accType) {
            $resultSet = $this->importerManagement->getImporterWines($importerData->id);
            $importerWines = array();
            while ($row = $resultSet->fetch(PDO::FETCH_ASSOC)) {
                $importerWines[] = $row;
            }
            http_response_code(200);
            echo json_encode(array(
                'wines' => $importerWines
            ));
        } else {
            http_response_code(403);
            echo json_encode(array(
                "message" => "Access denied!"
            ));
        }
    }

    public function getAllImporters()
    {
        $importers = array();
        $resultSet = $this->importerManagement->getAllImporters();
        while ($row = $resultSet->fetch(PDO::FETCH_ASSOC)) {
            $importers[] = $row;
        }
        http_response_code(200);
        echo json_encode(array(
            'importers' => $importers
        ));
    }

    public function getImporterData()
    {
        $data = json_decode(file_get_contents("php://input"));
        $jwt = isset($data->jwt) ? $data->jwt : "";
        $importerData = TokenManagement::decodeToken($jwt);
        if ($importerData->accType == self::$accType) {
            $resultSet = $this->importerManagement->getImporterData($importerData->id);
            $importerDataFromDB = array();
            while ($row = $resultSet->fetch(PDO::FETCH_ASSOC)) {
                $importerDataFromDB[] = $row;
            }
            http_response_code(200);
            echo json_encode(array(
                'wines' => $importerDataFromDB
            ));
        } else {
            http_response_code(403);
            echo json_encode(array(
                "message" => "Access denied!"
            ));
        }
    }

}