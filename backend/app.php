<?php/*    Psych Desktop    Copyright (C) 2006 Psychiccyberfreak    This program is free software; you can redistribute it and/or modify    it under the terms of the GNU General Public License as published by    the Free Software Foundation; either version 2 of the License, or    (at your option) any later version.    This program is distributed in the hope that it will be useful,    but WITHOUT ANY WARRANTY; without even the implied warranty of    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the    GNU General Public License for more details.    You should have received a copy of the GNU General Public License along    with this program; if not, write to the Free Software Foundation, Inc.,    51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.	*/session_start();require("config.php");if (isset($_GET['action'])) {    //include("config.php");    $query = "SELECT * FROM ${db_prefix}apps";    $link = mysql_connect($db_host, $db_username, $db_password) or die('Could not connect: ' . mysql_error());    mysql_select_db($db_name) or die('Could not select database');    $result = mysql_query($query) or die('Query failed: ' . mysql_error());    $count=0;    while ($row = mysql_fetch_array($result, MYSQL_ASSOC))    {        echo $row['ID'];		echo "[==separator==]";		echo $row['name'];		echo "[==separator==]";        echo $row['category'];        if($count+1 != mysql_numrows($result)) {		echo "[==separator==]";		}        $count++;    }}if($_GET['id'] == null){    exit();}$link = mysql_connect($db_host, $db_username, $db_password) or die('Could not connect: ' . mysql_error());mysql_select_db($db_name) or die('Could not select database');$query = "SELECT * FROM ${db_prefix}apps WHERE id=\"${_GET['id']}\" LIMIT 1";$result = mysql_query($query) or die('Query failed: ' . mysql_error());while ($line = mysql_fetch_array($result, MYSQL_ASSOC)) {   foreach ($line as $col_value) {       echo stripslashes($col_value);       //echo $col_value;       echo "[==separator==]";   }}mysql_free_result($result);mysql_close($link);?>