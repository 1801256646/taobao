<?php
$link = mysqli_connect("127.0.0.1","root","root","sz2105");
$sql="SELECT * FROM `province`";
$res=mysqli_query($link,$sql);
$arr=[];
while($row=mysqli_fetch_assoc($res)){
    array_push($arr,$row);
}
//将得到的数组转为json格式
$resArr=json_encode($arr);
echo $resArr;



?>