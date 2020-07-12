<?php 
    require_once './class/DBqueries.php';
    require_once './utils/functions.php';
    require_once './utils/function_custom.php';
    
    //include './vendor/sub_tpl_head.php';
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

    <link rel="stylesheet" type="text/css" href="./vendor/vendor.min.css"/>
	<link rel="stylesheet" type="text/css" href="./css/style.css" />
    <script type="text/javascript" src="./vendor/vendor.min.js"></script>
	<script type="text/javascript" src="./js/scripts.min.js"></script>

    <title>Template</title>
<body>
    <div class="container">
        <h1>Wellcome to</h1>
        <p>Web template</p>
        <div class="btn-standard">About</div>
        <?php echo showData(); ?>


        <div class="single-item">
            <div style="background-image:url('./images/1.jpg');"></div>
            <div style="background-image:url('./images/2.jpg');"></div>
            <div style="background-image:url('./images/3.jpg');"></div>
        </div>
    </div>  

    
</body>
</html>