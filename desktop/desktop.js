/*
    Psych Desktop
    Copyright (C) 2006 HFLW

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
/**
* Contains all the core functions of the desktop
*
* @classDescription	Contains all the core functions of the desktop
* @memberOf desktop
* @constructor	
*/
desktop.core = new function()
{
		/** 
		* Instalizes the desktop
		* 
		* @alias desktop.core.init
		* @type {Function}
		* @memberOf desktop.core
		*/
		this.init = function()
		{
		    dojo.require("dojo.lfx.*");
			dojo.require("dojo.widget.*");
			dojo.require("dojo.widget.TaskBar");
			dojo.require("dojo.widget.LayoutContainer");
			dojo.require("dojo.widget.FloatingPane");
			dojo.require("dojo.widget.ResizeHandle");
			dojo.require("dojo.widget.DomWidget");
			dojo.require("dojo.widget.Toaster");
			dojo.lang.extend(dojo.widget.TaskBarItem, {
				//templateCssPath: dojo.uri.Uri("./themes/default/taskbar.css"),
				templateCssString: "",
				templateCssPath: null
			});
			dojo.lang.extend(dojo.widget.FloatingPane, {
				//templateCssPath: dojo.uri.Uri("./themes/default/window.css"),
				templateCssString: "",
				templateCssPath: null
			});
			desktop.core.uiInit();
			desktop.wallpaper.init();
			desktop.windows.init();
			desktop.console.draw();
			desktop.menu.draw();
			desktop.taskbar.draw();
			desktop.menu.getApplications();
			desktop.windows.desktopResize();
			desktop.rightclick.init();
			window.onresize = desktop.windows.desktopResize;
			document.body.onmouseup = dojo.lang.hitch(desktop.menu, desktop.menu.leftclick);
			div = document.createElement("div");
			div.id="toaster";
			document.body.appendChild(div);
			dojo.widget.createWidget("toaster", {
				id: "toaster",
				separator: "<hr>",
				positionDirection: "tr-down",
				duration: 0,
				messageTopic: "psychdesktop"
			}, div);
			dojo.widget.createWidget("TaskBar", {id: "appbar", width: "100%"}, dojo.byId("appbar"));
			api.registry.getValue(-1,"taskbarVisibility",desktop.taskbar.setVisibility);
			api.user.getUserName(function(data){
				dojo.byId("menu_name").innerHTML = "<i>"+data+"</i>";
			});
			window.onbeforeunload = function()
			{
			  
			  desktop.core.logout();
			  //log out quickly
			}
			//document.onkeydown = desktop.console.toggle;
			dojo.event.connect(document, "onkeydown", desktop.console.toggle);
			window.onerror = function(e)
			{
				api.console(e);
				alert("Psych Desktop encountered an error.\nPlease report this to the developers with the console output.\n(press the '`' key)")
			}
		}
		dojo.addOnLoad(this.init);
		/** 
		* Logs the user out
		* 
		* @alias desktop.core.logout
		* @type {Function}
		* @memberOf desktop.core
		*/
		this.logout = function()
		{
			api.user.getUserName(function(data){
				dojo.io.bind({
    				url: "../backend/logout.php?user="+data,
    				load: function(type, data, evt){
						if(data == "0")
						{
							window.onbeforeunload = null;
							window.close();
						}
						else
						{
							api.toaster("Error communicating with server, could not log out");
						}
					},
   					mimetype: "text/plain"
				});
			});
		}
		/** 
		* Shows or hides the loading indicator
		* 
		* @alias desktop.core.loadingIndicator
		* @param {Integer} action	When set to 0 the loading indicator is displayed. When set to 1, the loading indicator will be hidden.
		* @type {Function}
		* @memberOf desktop.core
		*/
		this.loadingIndicator = function(action)
		{
			if(action == 0)
			{
			dojo.lfx.html.fadeIn('loadingIndicator', 300).play();
			dojo.byId("loadingIndicator").style.display = "inline";
			}
			if(action == 1)
			{
			dojo.lfx.html.fadeOut('loadingIndicator', 300).play();
			document.getElementById("loadingIndicator").style.display = "none";
			}
		}
		/** 
		* Draws the loading indicator
		* 
		* @alias desktop.core.uiInit
		* @type {Function}
		* @memberOf desktop.core
		*/
		this.uiInit = function()
		{
			div = document.createElement("div");
			div.innerHTML = "<center><img style='vertical-align: middle;' src='../images/UI/loading.gif' /><span style='vertical-align: middle;'> <b>Loading...</b></span></center>";
			div.id="loadingIndicator";
			document.body.appendChild(div);
		}

	}
