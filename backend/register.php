<?php
header("Content-type: text/plain");
if($_POST)
{
    require ("./backend/config.php");
    $link = mysql_connect($db_host, $db_username, $db_password)
       or die('Could not connect: ' . mysql_error());
    mysql_select_db($db_name) or die('<br>Could not select database');

    //preform username lookup
    $query = "SELECT username FROM {$db_prefix}users WHERE username = '${_POST['user']}'";
    $result = mysql_query($query) or die('Query failed: ' . mysql_error());
    $line = mysql_fetch_array($result, MYSQL_ASSOC) ;
    if($line)
    {
        foreach ($line as $col_value)
        {
            if($_POST["user"] == $col_value)
            {
                echo "1";
            }
        }
    }
    else
    {
        register_user($_POST['user'] , $_POST['pass'] , $_POST['email']);
    }
}

function register_user($username , $password, $email)
{
require("./backend/config.php");
$password = crypt($password, $conf_secretword);
$link = mysql_connect($db_host, $db_username, $db_password)
   or die('Could not connect: ' . mysql_error());
mysql_select_db($db_name) or die('<br>Could not select database');
$query = "INSERT INTO `${db_prefix}users` (`username`, `email`, `password`, `logged`, `ID`, `level`) VALUES ('${username}', '${email}', '${password}', '0', NULL, 'user');";
$result = mysql_query($query) or die('Query failed: ' . mysql_error());
echo "<script type='text/javascript'> window.location = './index.php?opmessage=Registration+Successfull'</script>";
// Free resultset
mysql_free_result($result);
// Closing connection
mysql_close($link);
echo "0";
}
?>
