<?php
$link=mysqli_connect('127.0.0.1','root','root','sz2105');
$id=$_GET['id'];
$sql="SELECT *FROM `taobao` WHERE id<($id*5+1) AND id>(($id-1)*5)";
$res=mysqli_query($link,$sql);
$arr=[];
while($row=mysqli_fetch_assoc($res)){
    array_push($arr,$row);
}
echo json_encode($arr);

?>