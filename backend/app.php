<?phpsession_start();if (isset($_SESSION['userloggedin'])) { //check to see if the user is looged in!if (isset($_GET['registry'])) { if ($_GET['registry'] == ("load")) {// prototype registry value loading system - jaymacdonald    include("config.php");	$userid = $_SESSION['userid']; // no longer a security risk	$appid = $_GET['appid'];	$varname = $_GET['varname'];    $query = "SELECT * FROM ${db_prefix}registry WHERE userid=\"${userid}\" AND appid=\"${appid}\" AND varname=\"${varname}\"";    $link = mysql_connect($db_hostname, $db_username, $db_password) or die('Could not connect: ' . mysql_error());    mysql_select_db($db_name) or die('Could not select database');    $result = mysql_query($query) or die('Query failed: ' . mysql_error());    while ($row = mysql_fetch_array($result, MYSQL_ASSOC))    {		echo($row['value']);	//give the result :D    }}else if ($_GET['registry'] == ("save")) {//save a registry value}else {// not a valid registry commandecho("ERR"); }}if (isset($_GET['action'])) {    include("config.php");    $query = "SELECT * FROM ${db_prefix}apps";    $link = mysql_connect($db_hostname, $db_username, $db_password) or die('Could not connect: ' . mysql_error());    mysql_select_db($db_name) or die('Could not select database');    $result = mysql_query($query) or die('Query failed: ' . mysql_error());    $count=0;    while ($row = mysql_fetch_array($result, MYSQL_ASSOC))    {        echo $row['ID'];        echo "[==separator==]";        echo $row['name'];        if($count+1 != mysql_numrows($result)) { echo "[==separator==]"; }        $count++;    }}if(!$_GET['id']){    exit();}require("config.php");$link = mysql_connect($db_hostname, $db_username, $db_password) or die('Could not connect: ' . mysql_error());mysql_select_db($db_name) or die('Could not select database');$query = "SELECT * FROM ${db_prefix}apps WHERE id=\"${_GET['id']}\" LIMIT 1";$result = mysql_query($query) or die('Query failed: ' . mysql_error());while ($line = mysql_fetch_array($result, MYSQL_ASSOC)) {   foreach ($line as $col_value) {       echo stripslashes($col_value);       //echo $col_value;       echo "[==separator==]";   }}mysql_free_result($result);mysql_close($link);}else { //not logged inecho("401_NOT_LOGGED_IN"); // access denied error code?}?>