<?php

class DatabaseConn
{
    private $host = 'localhost';
    private $db_name = 's402340';
    private $username = 's402340';
    private $password = '1sau9n2v7b9e';

    public function getConn()
    {
        $conn = null;
        try {
            $conn = new PDO("mysql:host=" . $this->host . ";dbname=" . $this->db_name, $this->username, $this->password);
        } catch (PDOException $e) {
            echo 'Connection Error' . $e->getMessage();
        }
        return $conn;
    }

}