<?php
    
?>
<html>
	<head>
		<title>Psych Desktop Installer</title>
		<script type="text/javascript" src="../desktop/dojo/dojo/dojo.js" djConfig="parseOnLoad: true"></script>
		<script type="text/javascript" src="install.js"></script>
		<link href="style.css" rel="stylesheet" media="screen">
	</head>
	<body>
		<div style="position: absolute; top: 0px; left: 0px;"><h3>NOTE: this does not do anything yet. If you're installing, use /install.php</h3></div>
		<div class="buttons">
			<div dojoType="dijit.form.Button" id="previous" onClick="dijit.byId('wizard').back()">&lt;</div>
			<div dojoType="dijit.form.Button" id="next" onClick="dijit.byId('wizard').forward()">&gt;</div>
		</div>
		<div dojoType="dijit.layout.StackContainer" id="wizard">
			<div dojoType="dijit.layout.ContentPane" title="Start">
				<div class="title">Welcome to the Psych Desktop installer!</div>
				Before you start the installation, we recomend you do the following:<br />
				<ul>
					<li>chmod the /files/ directory to 777</li>
					<li>chmod the /backend/configuration.php file to 777</li>
					<li>create a database for the desktop, and grant a user all permissions to it</li>
				</ul>
			</div>
			<div dojoType="dijit.layout.ContentPane" title="Todo">
				<div class="title">What do you want to do?</div>
				<ul>
					<li>I want to do a clean installation</li>
					<p>Do a new installation, and create a new admin user</p>
					<li>I want to do a clean installation, but intergrate it with a CMS</li>
					<p>Do a new installation, then configure it to intergrate with a user table from a CMS</p>
					<!-- We should support drupal, joomla/mambo, phpnuke, and some others -->
					<li>I want to update my existing installation</li>
					<p>Keeps your settings and users, but re-installs apps and other things</p>
					<!--TODO: make these do something -->
				</ul>
			</div>
			<div dojoType="dijit.layout.ContentPane" title="Database">
				<div class="title">Database Settings</div>
				<br />
				<!--Database Type:&nbsp;
				<select name="db_type">
					<option>mySQL</option>
				</select>
				<br />-->
				Database Name:&nbsp;
				<input name="db_name" type="text" />
				<br />
				Table Prefix:&nbsp;
				<input name="db_prefix" type="text" />
				<br />
				Username:&nbsp;
				<input name="db_username" type="text" />
				<br />
				Password:&nbsp;
				<input name="db_password" type="text" />
			</div>
			<div dojoType="dijit.layout.ContentPane" title="Finish">
				<div class="title">Installation</div>
				Please delete the /install/ directory for security purposes. Enjoy!
			</div>
		</div>
	</body>
</html>