<?php

if(isset($_POST['data'])){
	$path = "../data.json";
 	unlink($path);
 	$json_data = json_encode($_POST['data']);
	file_put_contents('../data.json', $json_data); 
}
?>