<?php
//error_reporting(0);
//get rid of magicquotes
if (get_magic_quotes_gpc())
{
	foreach($_POST as $key => $value)
	{
		$_POST[$key] = stripslashes($value);
	}
}
if (get_magic_quotes_gpc())
{
	foreach($_GET as $key => $value)
	{
		$_GET[$key] = stripslashes($value);
	}
}

//util functions
function internal_error($type)
{
	$p = new intOutput();
	$p->set($type);
	die();
}

function import($module) {
	$module = explode(".", $module);
	$module = implode(DIRECTORY_SEPARATOR, $module);
	return require($GLOBALS['path'] . $module . ".php");
}
?>