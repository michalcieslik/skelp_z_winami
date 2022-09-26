<?php
include_once 'WinesManagement.php';
include_once '../DatabaseConnection/DatabaseConn.php';
include_once '../Auth/TokenManagement.php';
include_once '../ImporterManagement/ImporterAPI.php';


class WinesAPI
{
    private $winesManagement;

    public function __construct()
    {
        $databaseConn = new DatabaseConn();
        $conn = $databaseConn->getConn();
        $this->winesManagement = new WinesManagement($conn);
    }

    public function getOriginCountries()
    {
        $data = json_decode(file_get_contents("php://input"));
        $jwt = isset($data->jwt) ? $data->jwt : "";
        TokenManagement::decodeToken($jwt);
        $resultSet = $this->winesManagement->getOriginCountries();
        $countries = array();
        while ($row = $resultSet->fetch(PDO::FETCH_ASSOC)) {
            $countries[] = $row;
        }
        http_response_code(200);
        echo json_encode(array(
            'countries' => $countries
        ));
    }

    public function getWinesFromCountry($country)
    {
        $data = json_decode(file_get_contents("php://input"));
        $jwt = isset($data->jwt) ? $data->jwt : "";
        TokenManagement::decodeToken($jwt);
        $resultSet = $this->winesManagement->getWinesFromCountry($country);
        $winesFromCountry = array();
        while ($row = $resultSet->fetch(PDO::FETCH_ASSOC)) {
            $winesFromCountry[] = $row;
        }
        http_response_code(200);
        echo json_encode(array(
            'wines' => $winesFromCountry
        ));
    }

    public function createNewWine()
    {
        //TODO
        $data = json_decode($_POST['data']);
        $jwt = isset($data->jwt) ? $data->jwt : "";
        $importerData = TokenManagement::decodeToken($jwt);
        if ($importerData->accType == ImporterAPI::$accType) {
            $fileName = $_FILES['sendImage']['name'];
            $tempPath = $_FILES['sendImage']['tmp_name'];
            $fileSize = $_FILES['sendImage']['size'];
            if (empty($fileName)) {
                http_response_code(400);
                die(json_encode(array(
                    "message" => "Image not selected!"
                )));
            } else {
                $phpAdditionalPath = '../..';
                $path = '/wineImages/';
                $imgExtension = strtolower(pathinfo($fileName, PATHINFO_EXTENSION));
                $validExtensions = array('jpeg', 'jpg', 'png');
                if (in_array($imgExtension, $validExtensions)) {
                    if (!file_exists($phpAdditionalPath . $path . $fileName)) {
                        if ($fileSize < 5000000) {
                            move_uploaded_file($tempPath, $phpAdditionalPath . $path . $fileName);
                        } else {
                            http_response_code(400);
                            die(json_encode(array(
                                "message" => "File is too large"
                            )));
                        }
                    } else {
                        http_response_code(400);
                        die(json_encode(array(
                            "message" => "File already exist"
                        )));
                    }
                } else {
                    http_response_code(400);
                    die(json_encode(array(
                        "message" => "Wrong file extension"
                    )));
                }
                if ($this->winesManagement->createNewWine($data, $importerData->id, $path . $fileName)) {
                    http_response_code(200);
                    echo json_encode(array(
                        "message" => "Wine created successful"
                    ));
                } else {
                    http_response_code(400);
                    echo json_encode(array(
                        "message" => "Failure during wine creation. Check provided data"
                    ));
                }
            }
        } else {
            http_response_code(403);
            echo json_encode(array(
                "message" => "Access denied!"
            ));
        }
    }

    public function filterWines(){
        $data = json_decode(file_get_contents("php://input"));
        $jwt = isset($data->jwt) ? $data->jwt : "";
        TokenManagement::decodeToken($jwt);
        $resultSet = $this->winesManagement->filterWines();
        $filteredWinesList = array();
        while ($row = $resultSet->fetch(PDO::FETCH_ASSOC)) {
            $filteredWinesList[] = $row;
        }
        http_response_code(200);
        echo json_encode(array(
            'wines' => $filteredWinesList
        ));
    }

}