<?php/*    Psych Desktop    Copyright (C) 2006 Psychiccyberfreak    This program is free software; you can redistribute it and/or modify    it under the terms of the GNU General Public License as published by    the Free Software Foundation; either version 2 of the License, or    (at your option) any later version.    This program is distributed in the hope that it will be useful,    but WITHOUT ANY WARRANTY; without even the implied warranty of    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the    GNU General Public License for more details.    You should have received a copy of the GNU General Public License along    with this program; if not, write to the Free Software Foundation, Inc.,    51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.	*/if($_COOKIE['logged'] == "yes"){echo "<script type='text/javascript'>window.location='./index2.php'</script>";}?><html><head><title>Psych Desktop Administration - Log In</title></head><body><table border= "0" width="100%" cellpadding= "0" cellspacing= "0" style="background-image: url('../images/header.gif'); position: absolute; top: 0px; left: 0px;"><tr><td><img src="../images/logo.gif"></td></tr></table><br><br><br><br><br><br><br><center>Please Log In.<br><br><form action="./dologin.php" method="post"><b>Username: </b><input type="text" name="user" ><br><b>Password: </b><input type="password" name="pass" ><br><input type="submit" value="Log In"></form><a href="../index.php">Back to Front Page</a></center></body></html>