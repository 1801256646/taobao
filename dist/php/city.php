<?php
$link=mysqli_connect("127.0.0.1","root","root","sz2105");
$province_id=$_GET["province_id"];
$sql="SELECT * FROM `city` WHERE `province_id`='$province_id'";
$res=mysqli_query($link,$sql);
$arr=[];
while($row=mysqli_fetch_assoc($res)){
    array_push($arr,$row);
}
$resJson=json_encode($arr);
echo $resJson;



?>