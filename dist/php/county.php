<?php
$link=mysqli_connect("127.0.0.1","root","root","sz2105");
$city_id=$_GET["city_id"];
$sql="SELECT * FROM `area` WHERE `city_id`='$city_id'";
$res=mysqli_query($link,$sql);
$arr=[];
while($row=mysqli_fetch_assoc($res)){
    array_push($arr,$row);
}
$resJson=json_encode($arr);
echo $resJson;



?>