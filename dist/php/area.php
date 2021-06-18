<?php
$link=mysqli_connect("127.0.0.1","root","root","sz2105");
$area_id=$_GET["area_id"];
$sql="SELECT * FROM `town` WHERE `area_id`='$area_id'";
$res=mysqli_query($link,$sql);
$arr=[];
while($row=mysqli_fetch_assoc($res)){
    array_push($arr,$row);
}
$resJson=json_encode($arr);
echo $resJson;



?>