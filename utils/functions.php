<?php 

function setGetVar($var) {
	return isset($_GET[$var])? $_GET[$var] : null;
}

function setPostVar($var) {
	return isset($_POST[$var])? $_POST[$var] : null;
}

?>