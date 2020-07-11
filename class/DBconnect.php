<?php

class DBconnect{
	
	private static $servername="localhost";
	private static $username="root";
	private static $password="rootko1";
	private static $dbname="collectiondb";
	private static $instance=null;
	
	private function __construct(){}
	
	private function __clone(){}
	

	public static function getInstance(){
		if(!self::$instance){
			
			$config="mysql:host=" . self::$servername . ";dbname=" . self::$dbname;
			$options = array(
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_PERSISTENT => true,
                PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8'
            );
			
			self::$instance=new PDO($config, self::$username, self::$password, $options);
			
		}
		
		return self::$instance;
	}
}
?>