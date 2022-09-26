<?php

class WinesManagement
{
    private $conn;
    private $params;

    public function __construct($conn)
    {
        $this->conn = $conn;
    }

    public function getOriginCountries()
    {
        $query = "SELECT DISTINCT country FROM wine";
        $stmt = $this->conn->prepare($query);
        try {
            $stmt->execute();
            return $stmt;
        } catch (PDOException $e) {
            http_response_code(500);
            die(json_encode(array(
                "message" => "DB error"
            )));
        }
    }

    public function getWinesFromCountry($country)
    {
        $query = "SELECT * FROM wine WHERE country = :country";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':country', $country);
        try {
            $stmt->execute();
            return $stmt;
        } catch (PDOException $e) {
            http_response_code(500);
            die(json_encode(array(
                "message" => "DB error"
            )));
        }
    }

    public function createNewWine($data, $importerId, $imgPath)
    {
        $query = "INSERT INTO wine (country, price, name, wine_type, id_importer, capacity, alcoholic_strength, img_path)
                VALUES (:country, :price, :name, :wine_type, :id_importer, :capacity, :alcoholic_strength, :img_path)";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':country', $data->country);
        $stmt->bindParam(':price', $data->price);
        $stmt->bindParam(':name', $data->name);
        $stmt->bindParam(':wine_type', $data->wineType);
        $stmt->bindParam(':id_importer', $importerId);
        $stmt->bindParam(':capacity', $data->capacity);
        $stmt->bindParam(':alcoholic_strength', $data->alcoholicStrength);
        $stmt->bindParam(':img_path', $imgPath);
        try {
            if ($stmt->execute())
                return true;
            return false;
        } catch (PDOException $e) {
            return false;
        }
    }

    public function filterWines()
    {
        //$query = "SELECT * FROM wine WHERE quantity<> 0";
        $query = "SELECT wine.id, wine.country, wine.price, wine.name, wine.wine_type, wine.id_importer, wine.capacity, 
        wine.alcoholic_strength, wine.quantity, wine.img_path, importer.name AS importerName FROM `wine`, `importer` 
        WHERE importer.id_importer = wine.id_importer AND quantity<>0";
        $filters = $this->getFilters();
        if (!empty($filters)) {
            foreach ($filters as $filter) {
                $query = $query . $filter;
            }
        }
        $stmt = $this->conn->prepare($query);
        if (isset($this->params['country'])) {
            $stmt->bindParam(":country", $this->params['country']);
        }
        if (isset($this->params['importerName'])) {
            $stmt->bindParam(":importerName", $this->params['importerName']);
        }
        try {
            $stmt->execute();
            return $stmt;
        } catch (PDOException $e) {
            http_response_code(500);
            die(json_encode(array(
                "message" => "DB error"
            )));
        }

    }

    private function getFilters()
    {
        $filters = array();
        $url = $_SERVER['REQUEST_URI'];
        $urlComponents = parse_url($url);
        if (isset($urlComponents['query'])) {
            parse_str($urlComponents['query'], $this->params);
        }
        if (isset($this->params['country'])) {
            $filters[] = " AND wine.country = :country";
        }
        if (isset($this->params['importerName'])) {
            $filters[] = " AND importer.name = :importerName";
        }
        if (isset($this->params['price'])) {
            if ($this->params['price'] == "DESC") {
                $filters[] = " ORDER BY wine.price DESC";
            } else {
                $filters[] = " ORDER BY wine.price ASC";
            }
        } elseif (isset($this->params['quantity'])) {
            if ($this->params['quantity'] == "DESC") {
                $filters[] = " ORDER BY wine.quantity DESC";
            } else {
                $filters[] = " ORDER BY wine.quantity ASC";
            }
        } elseif (isset($this->params['name'])) {
            if ($this->params['name'] == "DESC") {
                $filters[] = " ORDER BY wine.name DESC";
            } else {
                $filters[] = " ORDER BY wine.name ASC";
            }
        }
        return $filters;
    }

}