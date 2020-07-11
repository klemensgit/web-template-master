<?php

function showData($isAjax = false, $limit = ''){
    $html = '';
    
    if(!$isAjax){
        $limit = 1000;
    }

    $data = DBqueries::getData($limit);
    $count = sizeof($data);
    
    if($count<1){
        return "No data";
    }

	for($i=0; $i<$count; $i++){	
		$html .= '<p>'.$data[$i]["title"].'</p>';   
    }

    return $html;
}

?>