dojo.provide("desktop.ui.applets.Menu");
dojo.require("dijit.Menu");
dojo.requireLocalization("desktop.ui", "menus");
dojo.requireLocalization("desktop", "places");
dojo.requireLocalization("desktop", "apps");
dojo.declare("desktop.ui.applets.Menu", desktop.ui.Applet, {
	//	summary:
	//		A simple menu applet
	dispName: "Main Menu",
	postCreate: function() {
		this._getApps();
		//this._interval = setInterval(dojo.hitch(this, this._getApps), 1000*60);
		dojo.addClass(this.containerNode, "menuApplet");
		dojo.subscribe("updateMenu", dojo.hitch(this, "_getApps"));
		this.inherited("postCreate", arguments);
	},
	uninitialize: function() {
		//clearInterval(this._interval);
		if(this._menubutton) this._menubutton.destroy();
		if(this._menu) this._menu.destroy();
		this.inherited("uninitialize", arguments);
	},
	_makePrefsMenu: function() {
		//	summary:
		//		Creates a preferences menu and returns it
		var l = dojo.i18n.getLocalization("desktop.ui", "menus");
		var pMenu = new dijit.Menu();
		dojo.forEach([
			{
				label: l.appearance,
				iconClass: "icon-16-apps-preferences-desktop-theme",
				onClick: function() { desktop.ui.config.appearance(); }
			},
			{
				label: l.accountInfo,
				iconClass: "icon-16-apps-system-users",
				onClick: function() { desktop.ui.config.account(); }
			}
		], function(args) {
			pMenu.addChild(new dijit.MenuItem(args));
		});
		return pMenu;
	},
	_drawButton: function() {
		//	summary:
		//		Creates a drop down button for the applet.
		var l = dojo.i18n.getLocalization("desktop.ui", "menus");
		dojo.require("dijit.form.Button");
		if (this._menubutton) {
			this._menubutton.destroy();
		}
		this._menu.addChild(new dijit.PopupMenuItem({
			label: l.preferences,
			iconClass: "icon-16-categories-preferences-desktop",
			popup: this._makePrefsMenu()
		}))
		this._menu.addChild(new dijit.MenuItem({
			label: l.logOut, 
			iconClass: "icon-16-actions-system-log-out",
			onClick: desktop.user.logout
		}));
		var div = document.createElement("div");
		this.containerNode.appendChild(div);
		var b = new dijit.form.DropDownButton({
			iconClass: "icon-16-places-start-here",
			label: l.applications,
			showLabel: false,
			dropDown: this._menu
		}, div);
		dojo.addClass(b.domNode, "menuApplet");
		dojo.style(b.focusNode, "border", "0px");
		b.domNode.style.height="100%";
		b.startup();
		this._menubutton = b;
	},
	_getApps: function() {
		//	summary:
		//		Gets the app list from the server and makes a menu for them
		var l = dojo.i18n.getLocalization("desktop.ui", "menus");
		var ap = dojo.i18n.getLocalization("desktop", "apps");

		var data = desktop.app.appList;
		if (this._menu) {
			this._menu.destroy();
		}
		var menu = this._menu = new dijit.Menu({});
		var cats = {};
		for(var item in data)
		{
			cats[data[item].category] = true;
		}
		var list = [];
		for(var cat in cats)
		{
			list.push(cat);
		}
		list.sort();
		for(var cat in list)
		{
			var cat = list[cat];
			//cat.meow();
			var category = new dijit.PopupMenuItem({
				iconClass: "icon-16-categories-applications-"+cat.toLowerCase(),
				label: l[cat.toLowerCase()] || cat
			});
			var catMenu = new dijit.Menu({parentMenu: category});
			for(var app in data)
			{
				if(data[app].category == cat)
				{
					var item = new dijit.MenuItem({
						label: ap[data[app].name] || data[app].name
					});
					dojo.connect(item, "onClick", dojo.hitch(desktop.app, "launch", data[app].id));
					catMenu.addChild(item);
				}
			}
			catMenu.startup();
			category.popup = catMenu;
			menu.addChild(category);
		}
		menu.domNode.style.display="none";
		menu.startup();
		this._drawButton();
	}
});