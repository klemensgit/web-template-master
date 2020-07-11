<?php 
require_once "DBconnect.php";

class DBqueries{

    public static function getData($id = ''){
        $db = DBconnect::getInstance(); 
        $statement = $db->prepare("SELECT title, content FROM collection LIMIT {$id}");
        $statement->execute();
       
        return $statement->fetchAll();
    }
}


?>