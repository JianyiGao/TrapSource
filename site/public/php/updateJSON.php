<?php

if(isset($_POST['myData'])){
	$path = "../data.json";
	if (!unlink($path)) {
		echo "Error deleting";
	} else {
		echo "JSON deleted";
	}
	echo $_POST['myData']
 //some php operation
}

?>