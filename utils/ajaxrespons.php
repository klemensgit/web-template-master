<?php

include_once ('../class/DBqueries.php');
include_once 'functions.php';
include_once 'function_custom.php';


switch(setGetVar('func')){
    case 'getData':
        echo getDataByAjax();
        break;
}

switch(setPostVar('func')){
    case 'getData':
        echo getPostDataByAjax();
        break;
}

function getDataByAjax(){
    echo showData(true, setGetVar('limit'));
}


function getPostDataByAjax(){
    echo showData(true, setPostVar('limit'));
}

?>