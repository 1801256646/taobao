<?php
$link=mysqli_connect('127.0.0.1','root','root','sz2105');
$username=$_POST['username'];
$password=$_POST['password'];
$sql="SELECT *FROM `user` WHERE `username`='$username'";
$res=mysqli_query($link,$sql);
$row=mysqli_fetch_assoc($res);
if($row){
    if($row['password']==$password){
        echo json_encode(["status"=>1]);
    }else{
        echo json_encode(["status"=>0,"error"=>"密码错误"]);
    }
}else{
    echo json_encode(["status"=>0,"error"=>"用户名错误"]);
}

?>