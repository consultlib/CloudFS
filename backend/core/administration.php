<?php
/*
    Psych Desktop
    Copyright (C) 2006 Psychiccyberfreak

    This program is free software; you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation; either version 2 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License along
    with this program; if not, write to the Free Software Foundation, Inc.,
    51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.
	*/
	session_start();
	require("../configuration.php");
	require("../models/user.php");
	if($_SESSION['userlevel'] == "admin")
	{
		if($_GET['section'] == "users")
		{
			if($_GET['action'] == "list")
			{
				$p = $User->all();
				$pl = count($p)-1;
				echo "[";
				foreach($p as $d => $v)
				{
					echo $v->make_json();
					if($d < $pl) { echo ",\n"; }
				}
				echo "]";
			}
		}
	}
?>