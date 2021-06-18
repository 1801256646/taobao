<?php
$link=mysqli_connect('127.0.0.1','root','root','sz2105');
$sql="SELECT *FROM `taobao` WHERE id<6";
$res=mysqli_query($link,$sql);
$arr=[];
while($row=mysqli_fetch_assoc($res)){
    array_push($arr,$row);
}
echo json_encode($arr);

?>