<?php
if($_SERVER[PHP_SELF]=="/desktop/desktop.php")
   {
   header("Location: /desktop/index.php");
   exit;
   } 
?>
<html>
<title>Psych Desktop</title>
<head>

<script type="text/javascript">
var kiosk = 0;
</script>

<link rel="stylesheet" href="desktop.css" type="text/css" media="screen" />
<script type="text/javascript" src="./dojo/dojo.js"></script>
<script type="text/javascript">
        dojo.require("dojo.lfx.*");
	dojo.require("dojo.widget.*");
	dojo.require("dojo.widget.TaskBar");
	dojo.require("dojo.widget.LayoutContainer");
	dojo.require("dojo.widget.FloatingPane");
	dojo.require("dojo.widget.ResizeHandle");
	dojo.require("dojo.widget.DomWidget");
    </script>
<script type="text/javascript" language="javascript" src="psychdesktop.js"></script>
<?php
echo "\n<script type='text/javascript'>\n" . "var conf_user = '${conf_user}'" . "\n</script>\n";
?>
</head>
<body>
<div ID='taskbar' style="zindex: 10000;"><center>loading...</center></div>
<div ID='taskbarhider' onClick="taskbarhider()" style="zindex: 11000;"><img src="./icons/hidetask.gif"></div>
<div id="sysmenu" style="display: none"><table border="0" cellpadding="0" cellspacing="0"><tr></tr><td><img src="./backgrounds/sysmenutop.gif"></td><tr><td style="background: url(./backgrounds/sysmenumiddle.gif);" align="center">
<script type="text/javascript">
document.write("<i>"+conf_user+"</i><p> </p>")
</script>
<center>
<table cellpadding="0" cellspacing="0" width="90%" id="menu">
<tr>
<td onClick = "app_launch(1);" style="border-top: 1px solid white;">Calculator</td>
</tr>
<tr>
<td onClick = "app_launch(2);" style="border-top: 1px solid white;">Web Browser</td>
</tr>
<tr>
<td onClick = "app_launch(9);" style="border-top: 1px solid white;">Control Panel</td>
</tr>
<tr>
<td onClick="if(kiosk != 1){logout();}else{Dialog.alert('<br><center>Kiosk mode active, logout denied</center>', {width:300, height:100, okLabel: 'close', ok:function(win) {debug('validate alert panel'); return true;}});}"style="border-top: 1px solid white; border-bottom: 1px solid white;">Logout</td>
</tr>
</table>
</center></td></tr></table></div>
<div id="loadingIndicator" style="display: none; position: absolute; bottom: 50px; right: 15px; background-color: #444444; color: #FFFFFF; height: 25px; width: 130px; zindex: 1000;"><center><img style="vertical-align: middle;" src='../images/UI/loading.gif' /><span style="vertical-align: middle;"> <b>Loading...</b></span></center></div>
<?php /* <div dojoType="TaskBar" id="appbar" hasShadow="true" resizable="false" style="width: 80%; height: 50px; margin: 0px; padding:0px; bottom: 30px; left: 5%; overflow: hidden;"></div> */ ?>
<script type="text/javascript">
drawtaskbar();
setWallpaper("./wallpaper/default.gif");
</script>
</body>
</html>
