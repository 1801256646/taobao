<?php
$link=mysqli_connect('127.0.0.1','root','root','sz2105');
$username=$_POST['username'];
$password=$_POST['password'];
$email=$_POST['email'];
$sql="SELECT *FROM `user` WHERE `username`='$username'";
$res=mysqli_query($link,$sql);
$row=mysqli_fetch_assoc($res);
if(!$row){
    $sql1="SELECT *FROM `user` WHERE `email`='$email'";
   $res1=mysqli_query($link,$sql1);
   $row1=mysqli_fetch_assoc($res1);
   if(!$row1){
       $sql2="INSERT INTO `user`(`username`,`password`,`email`) VALUE('$username','$password','$email')";
       $res=mysqli_query($link,$sql2);
       echo json_encode(["status"=>1,"error"=>"注册成功"]);
   }else{
       echo json_encode(["status"=>0,"error"=>"邮箱已被注册"]);
   }
}else{
    echo json_encode(["status"=>0,"error"=>"用户名已被注册"]);
}

?>